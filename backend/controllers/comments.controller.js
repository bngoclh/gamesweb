const Comment = require("../models/comments.model");
const MetacriticComment = require("../models/metacritics.comments.model");

const axios = require('axios');
const jsdom = require("jsdom");
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { JSDOM } = jsdom;
require('dotenv').config();

// const { response } = require('express');

//const User = require("./models/user.model.js");
// Importer les modules nécessaires

//passport.use(Comment.createStrategy());


const controller ={

    getComments: async (req, res, next) => {
        try {
            const comments = await Comment.find();
            res.json(comments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred" });
        }
    },
    
    postComment: async (req, res, next) => {
        try {
            const { game, comment, author } = req.body;
            //const username = "username"
    
            const newComment = new Comment({ game, comment, author });
            const savedComment = await newComment.save();
            res.json({ message: "commentaire posté !", comment: savedComment });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred" });
        }
    },
    

    // Permet de récupérer un commentaire par son id
    getListComment: async (req, res, next) => {
        const id = req.params.commentId;
        
        try {
            const comments = await Comment.find({ game: id });
            
            if (comments.length === 0) return res.status(404).json({ error: "No comments found" });

            res.json(comments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred" });
        }
    },
    /* Permet de mettre à jour un commentaire */
    putComment: async (req, res, next) => {
        try {
            const { commentId } = req.params;
            const { game, comment, author } = req.body;
            const updatedComment = { game, comment, author };
            const resultat = await Comment.findByIdAndUpdate(commentId, updatedComment, { new: true }); 
            // On ne peut pas modifier un commentaire qui n'existe pas
            if (!resultat) return res.status(404).json({ error: "Comment not found" });
            res.json(resultat);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "An error occurred" });
        }
    },
    
    deleteComment : async (req, res, next) => {
        try {
            const { commentId } = req.params;
            const resultat = await Comment.findByIdAndDelete(commentId);
            if (!resultat) return res.status(404).json({ error: "Comment not found" });
            res.json({ message: "Comment deleted" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred" });
        }
    },


    scrapeComment: async (req, res, next) => {

        //const url = req.params.urlId;
        try {
            const { url } = req.body;
            // Use the url to scrape data
            // Implement your scraping logic here

            const response = await axios.get(url);
            const html = response.data;

         
                // Use puppeteer to scrape data
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(url);

                // Implement your scraping logic here using puppeteer
                const userQuotes = await page.$$eval('.c-gameReview_quote_criticQuote', quotes => quotes.map(quote => quote.textContent));
                //const userQuotes = await page.$$eval('.c-siteReview_quote g-outer-spacing-bottom-small', quotes => quotes.map(quote => quote.textContent));


                
                 //console.log(userQuotes);

                await browser.close();
   
                res.json({ quotes: userQuotes });
              // Return the JSON object with the extracted information
        
            // Use the secondElement for further processing
            // Use the response data to extract the desired information
            // Implement your scraping logic here
            
            //res.json({ message: "Scraping completed" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred" });
        }
    },

    verifyComment: async (req, res, next) => {
        try {
            const { gameId } = req.params;
            const comments = await MetacriticComment.find({ game: gameId });
            res.json({ comments });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred" });
        }
    },

    addMetacriticComment: async (req, res, next) => {
        try {
            const {comment1, comment2, comment3, game } = req.body;
            const commentsList = [comment1, comment2, comment3];

            const newMetacriticComment = new MetacriticComment({ game, commentsList });
            const savedMetacriticComment = await newMetacriticComment.save();
            res.json({ message: "Metacritic comment added!", comment: savedMetacriticComment });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred" });
        }
    },


};
module.exports = controller;
