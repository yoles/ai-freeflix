import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import WebTorrent from "webtorrent";
import {fileURLToPath} from "url";
import path from "path";
import fs from "fs";
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';


dotenv.config();
const app = express()
const port = process.env.PORT || 3000
const token = process.env.API_TOKEN

app.use(bodyParser.json())
app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadsDir = path.join(__dirname, "downloads");
console.log(downloadsDir);
if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
}

const client = new WebTorrent();

function formatRuntime(runtime) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h${minutes}`;
}

async function get_magnet_link_tpb(page) {
    const magnetLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        return links
            .map(link => link.href)
            .filter(href => href.startsWith('magnet:'));
    });
    return magnetLinks;
}


async function get_torrents_link_1337x(url) {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    let torrentsLink = [];
    $('a').each((_, element) => {
        const link = $(element).attr('href');
        if (link && link.includes('/torrent/') && !link.toLowerCase().includes('porno')) {
            const splitLink = link.split('/').filter(i => !!i);
            const fullLink = link.startsWith('http') ? link : `https://1337x.to${link}`;
            torrentsLink.push({
                link: fullLink, 
                name: splitLink[splitLink.length - 1]
            });
        }
    });
    
    return torrentsLink;
}

async function get_magnet_link_1337x_from(url) {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const magnetLinks = [];
    $('a').each((_, element) => {
        const link = $(element).attr('href');
        if (link && link.includes('magnet:') && !link.toLowerCase().includes('porno')) {
            magnetLinks.push(link);
        }
    });
    
    return magnetLinks.length > 0 ? magnetLinks[0] : null;
}

app.get('/movie/now_playing', async (req, res) => {
    const url = "https://api.themoviedb.org/3/movie/now_playing";
    const movieDetailUrl = "https://api.themoviedb.org/3/movie";
    const posterUrl = "https://image.tmdb.org/t/p/w500/";

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(url, options)
    let data = await response.json();
    const rawMovies = data.results.slice(0, 5);
    const movies = [];

    const fetchDetailsPromises = rawMovies.map(movie => 
        fetch(`${movieDetailUrl}/${movie.id}`, options)
            .then(response => response.json())
    );
    const moviesDetails = await Promise.all(fetchDetailsPromises);
    for (const movie of moviesDetails) {
        movies.push({
            id: movie.id,
            title: movie.title,
            imageURL: posterUrl + movie.poster_path,
            genres: movie.genres.map(g => g.name),
            overview: movie.overview,
            duration: formatRuntime(movie.runtime),
        });
    }

    res.send(movies);
})

app.get('/movie/detail/:movieId', async (req, res) => {
    let movieId = req.params.movieId;

    const url = "https://api.themoviedb.org/3/movie/popular";
    const movieDetailUrl = "https://api.themoviedb.org/3/movie";
    const posterUrl = "https://image.tmdb.org/t/p/w500/";
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

    const response = await fetch(`${movieDetailUrl}/${movieId}`, options)
    const rawMovie = await response.json();

    const movie = {
        id: rawMovie.id,
        title: rawMovie.title,
        overview: rawMovie.overview,
        poster_path: posterUrl + rawMovie.poster_path,
    };

    const Url1337x = `https://1337x.to/search/${rawMovie.title}/1/`;
    const torrentsLink = await get_torrents_link_1337x(Url1337x);

    res.send({
        links: torrentsLink,
        movie: movie,
    });
})

app.get("/metadata/:magnet", async (req, res) => {
    let magnet = req.params.magnet;
    console.log("[DEBUG] Magnet: ", magnet);

    /* ------------------------------------------------------ */
    // Check if the torrent is already added
    let existingTorrent = await client.get(magnet);
    // console.log("Existing torrent:", existingTorrent);

    if (existingTorrent) {
        // If torrent is already added, return its file information
        let files = existingTorrent.files.map((file) => ({
            name: file.name,
            length: file.length,
        }));
        // console.log("Existing torrent files:", files);

        return res.status(200).json(files);
    }
    /* ------------------------------------------------------ */

    const torrent = client.add(magnet, { deselect: true, path: downloadsDir });

    torrent.on("metadata", () => {
        const files = torrent.files.map((file) => ({
            name: file.name,
            length: file.length,
        }));
        // console.log(files);

        res.status(200).json(files);
    });
});

app.post('/get/magnet', async (req, res) => {
    const link = req.body.link;
    const magnet = await get_magnet_link_1337x_from(link);
    res.send({magnet});
})


let detailsOfEpisode = {
    name: "",
    length: 0,
    downloaded: 0,
    progress: 0,
    percentageWatched: 0,
}

app.get("/streamfile/:magnet/:filename", async function (req, res, next) {
    let magnet = req.params.magnet;
    let filename = req.params.filename;

    console.log("Magnet: ", magnet);
    console.log("Filename: ", filename);

    let tor = await client.get(magnet);

    if (!tor) {
        return res.status(404).send("Torrent not found");
    }

    let file = tor.files.find((f) => f.name === filename);
    console.log("file :" + file.toString());

    if (!file) {
        return res.status(404).send("No file found in the torrent");
    }
    console.log(file);

    file.select();

    let range = req.headers.range;

    console.log("Range : " + range);

    if (!range) {
        return res.status(416).send("Range is required");
    }

    let positions = range.replace(/bytes=/, "").split("-");
    let start = parseInt(positions[0], 10);
    let file_size = file.length;
    let end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;
    let chunksize = end - start + 1;

    let head = {
        "Content-Range": `bytes ${start}-${end}/${file_size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/x-matroska",
    };

    res.writeHead(206, head);

    let stream_position = {
        start: start,
        end: end,
    };

    detailsOfEpisode.percentageWatched = (start / end) * 100;
    console.log("[DEBUG] Detail Episode: ", detailsOfEpisode);

    let stream = file.createReadStream(stream_position);
    stream.pipe(res);

    stream.on("error", function (err) {
        console.error("Stream error:", err);
        // Only send a response if headers haven't been sent yet
        if (!res.headersSent) {
            return res.status(500).send("Error streaming the video");
        }
    });

    stream.on("close", () => {
        console.log("Stream closed prematurely");
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})