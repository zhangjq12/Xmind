const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get("/api/bills", async (req, res) => {
    try {
        var file1 = fs.readFileSync("../data/bill.csv").toString();
        var file1arr = file1.split(/\r?\n/);
        var bill = [];
        for(var c of file1arr) {
            bill.push(c.split(","));
        }
        bill.shift();
        var file2 = fs.readFileSync("../data/categories.csv").toString();
        var file2arr = file2.split(/\r?\n/);
        var categories = [];
        for(var c of file2arr) {
            categories.push(c.split(","));
        }
        categories.shift();
        var table = [];
        for(var c of bill) {
            c[0] = c[0] == '0' ? '支出' : '收入';
            c[1] = new Date(parseInt(c[1]));
            for(var d of categories) {
                if(d[0] == c[2]) {
                    c[2] = d[2];
                    break;
                }
            }
            var obj = {type: undefined, time: undefined, category: undefined, amount: undefined};
            obj.type = c[0];
            obj.time = c[1];
            obj.category = c[2];
            obj.amount = parseFloat(c[3]).toFixed(2);
            table.push(obj);
        }
        res.status(200).json({
            table: table
        });
    }
    catch (e) {
        res.status(500)
    }
});

app.post("/api/addbills", async (req, res) => {
    const requests = {
        time: req.body.time,
        category: req.body.category,
        amount: req.body.amount
    }
    try {
        var file2 = fs.readFileSync("../data/categories.csv").toString();
        var file2arr = file2.split(/\r?\n/);
        var categories = [];
        for(var c of file2arr) {
            categories.push(c.split(","));
        }
        categories.shift();
        for(var c of categories) {
            if(c[0].toString() == requests["category"].toString()) {
                requests["type"] = c[1];
                break;
            }
        }
        console.log(requests);
        requests["time"] = Date.parse(requests["time"]);
        var file1 = fs.readFileSync("../data/bill.csv").toString();
        var str = '\n' + requests["type"] + ',' + requests["time"] + ',' + requests["category"] + ',' + requests["amount"];
        file1 += str;
        fs.writeFileSync("../data/bill.csv", file1);
        res.status(200).send({text: "success"});
    }
    catch(e) {
        res.status(500)
    }
})

app.listen("8081", () => {
    console.log("The Server Has Been Connected! Port Is 8081");
});