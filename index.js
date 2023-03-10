import axios from "axios";
import express from "express";
import * as cheerio from "cheerio";

const PORT = 4000

const app = express()

try{
    //Look for the webpage with axios
    const res = await axios.get("https://www.theguardian.com/uk")   
    //Get data from response
    const htmlString = res.data
    //Use cheerio to find into html
    const $ = cheerio.load(htmlString)
    //Create a sites array to put all coincidences
    const sites = []
    //Look for certain element on html and loop through the results
    $(".fc-item__title", htmlString).each((i,el)=>{
        //Extract some interesting parts
        const title = $(el).find('.fc-item__kicker').text().replace('\n','').trim()
        const url = $(el).find('a').attr('href')
        //And push it to array
        sites.push({item:i,title,url})
    })
    //Print data or do whatever you want
    console.log(sites)
    //Server listening
}
catch(err){
    //handle the posible error
    if (err instanceof axios.AxiosError) console.log(err.code)
    else console.log(err)
}
app.listen(PORT,()=>{console.log(`Running on PORT ${PORT}`)})