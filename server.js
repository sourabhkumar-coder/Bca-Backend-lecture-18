const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res,next) => {
    try {
        throw new Error('Something went wrong!');
    } catch (error) {
        //res.status(500).send('Internal Server Error');
        next(error); // Pass the error to the next middleware
    }
});

app.get("/age-check/:age", (req, res) => {
    let age = req.params.age;
    try{
        if (age < 18) {
            throw new Error('You are not eligible to vote');
        }else{
            res.send('You are eligible to vote');
        }
    } catch (error) {
        //res.status(500).json({success: false, message:"Age is less than 18"});
        next(error);
    }
});

app.use((err, req, res, next) => {
    res.status(500).json({success: false, message: err.message});
});

app.use((req, res) => {
    res.status(404).json({success:false, message:"Page not found"});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});