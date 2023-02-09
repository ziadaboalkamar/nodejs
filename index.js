const puppeteer = require('puppeteer');
const express = require("express");
const app = express();
const URL = require('url').URL;

app.use(express.json());

app.post('/api/v1/getdownloadlink',async(req,res) =>{
    if(req.is('application/json')){
        if(req.get("authorization") == "Bearer DZIIGAITDAAL:TARBEUNEDES__SADFJKL;QWERTYUIOP"){
        const {url,selector} = req.body;
        // console.log(req.get("authorization"));
        console.log(req.body);
        try {
            new URL(url);
           
          } catch (error) {
            return res.status(400).send({ error: 'Invalid URL' });
          }
        // Launch a browser instance
        const width=1024, height=1600;
        const browser = await puppeteer.launch(
            {
                defaultViewport: { width, height },
                headless: true
            }
        );
        const page = await browser.newPage();
    
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.setUserAgent( 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36' );
    try{
        const [response] = await Promise.all([
            page.waitForNavigation(),
            page.click(selector)
       ]);
    }catch(error){
        return res.status(400).send({ error: 'current node not found',"success":false});
    
    }
    
       var link = await page.evaluate(() => {
                            return window.location.href;
                       });
        await browser.close();
        res.send({
            "link": link,
            "success":true
        })
    }else{
        return res.status(401).send({ error: 'Unauthorized',"success":false});

    }
    }else{
        return res.status(400).send({ error: 'The Content Type not application/json',"success":false });

    }

   
})
app.listen(3000, () => console.log('API listening on port 3000'));


