const https = require("https");
const dotenv  = require('dotenv').config({path:`./config.env`});

//Controller Handler for checking usernmae
exports.getCheckUsername = (req, res) => {
    var username=req.query.username
    const username_options = {
        hostname: 'api.twitter.com',
        port: 443,
        path: `/2/users/by/username/${username}?user.fields=id`,
        method: 'GET',
        headers: {
            "User-Agent": "v2UserLookupJS",
            "authorization": `Bearer ${process.env.BEARER_TOKEN}`
        }
    }
    const twitterReq = https.request(username_options, twitterRes => {
        twitterRes.on('data', d => {
            let ans = JSON.parse(d.toString());
            if(ans.errors){
                ans={"exists":false}
                return res.json(ans)
            }
            ans["exists"]=true
            return res.json(ans)
        })
    })
    twitterReq.on('error', error => {
        let ans={"exists":false}
        return res.json(ans)
    })
    twitterReq.end()
};


//Controller handler for getting tweets
exports.getTweets = (req, res, next) => {
    var user_id=req.query.user_id
    const username_options = {
        hostname: 'api.twitter.com',
        port: 443,
        path: `/2/users/${user_id}/tweets`,
        method: 'GET',
        headers: {
            "User-Agent": "v2UserLookupJS",
            "authorization": `Bearer ${process.env.BEARER_TOKEN}`
        }
    }
    const twitterReq = https.request(username_options, twitterRes => {
        twitterRes.on('data', d => {
            let ans = JSON.parse(d.toString());
            console.log(ans)
            if(ans.meta.result_count>0){
                return res.json(ans.data)
            }
            else{
                return res.json([])
            }
        })
    })
    twitterReq.on('error', error => {
        let ans={"exists":false}
        return res.json(ans)
    })
    twitterReq.end()
};