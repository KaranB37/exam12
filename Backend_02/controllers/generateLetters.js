import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pdf from "pdf-creator-node"
import {options} from "../helpers/options.js"
import {data} from "../helpers/data.js"
import dotenv from "dotenv"
import SubjectModel from "../models/Subjects.js";

dotenv.config();

const homeView = (req, res, next) => {
    res.send("home")
    res.render("home");
}

const generatePdf = async (req, res, next) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const html = fs.readFileSync(path.join(__dirname, '../views/template.html'), 'utf-8');
    const fileName = Math.random() + "_doc" + ".pdf";
    // let array = [];
    console.log(req.body, "BODY")

    const {name, collegeID, division, branch, academicYear, report} = req.body
    const subjects = await SubjectModel.findAll()

    let tempSubjects = subjects.map((subject) => {
        return {
            subjectName: subject.dataValues.subjectName,
            subjectCode: subject.dataValues.subjectCode,
            termWork: subject.dataValues.termWork,
            oral: subject.dataValues.oral,
            practical: subject.dataValues.practical,
            theory: subject.dataValues.theory,
        }
    })

    const student = {
        name,
        collegeID,
        division,
        branch,
        academicYear,
        report,
        firstSemester:tempSubjects,
        date: new Date()
    }
    // data.forEach((d) => {
    //     array.push(prod)
    // })
    // let subTotal = 0;
    // array.forEach((i) => {
    //     subTotal += i.total
    // })
    // const tax = (subTotal * 20) / 100;
    // const grandTotal = subTotal - tax;
    // const obj = {
    //     prodList: array,
    // }

    const document = {
        html: html,
        data:{
            student
        },
        path: './docs/' + fileName
    }

    pdf.create(document, options).then(res => {
        console.log(res)
    }).catch(error => {
        console.log(error)
    })
    const filePath = `http://localhost:${process.env.PORT}/docs/${fileName}`
    
    res.status(200).json({result: true, message:"File downloading"})
}

export {
    generatePdf,
    homeView
}




// import fs from "fs"
// import path from "path"
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import pdf from "pdf-creator-node"
// import {options} from "../helpers/options.js"
// import {data} from "../helpers/data.js"
// import dotenv from "dotenv"

// dotenv.config();

// const homeView = (req, res, next) => {
//     res.send("home")
//     res.render("home");
// }

// const generatePdf = (req, res, next) => {
//     const __filename = fileURLToPath(import.meta.url);
//     const __dirname = dirname(__filename);

//     const html = fs.readFileSync(path.join(__dirname, '../views/template.html'), 'utf-8');
//     const fileName = Math.random() + "_doc" + ".pdf";
//     let array = [];

//     data.forEach((d) => {
//         const prod = {
//             name: d.name,
//             description: d.description,
//             unit: d.unit,
//             quantity: d.quantity,
//             price: d.price,
//             total: d.quantity + d.price,
//             imgUrl: d.imgurl
//         }
//         array.push(prod)
//     })
//     let subTotal = 0;
//     array.forEach((i) => {
//         subTotal += i.total
//     })
//     const tax = (subTotal * 20) / 100;
//     const grandTotal = subTotal - tax;
//     const obj = {
//         prodList: array,
//         subTotal,
//         grandTotal,
//         tax
//     }
//     const document = {
//         html: html,
//         data:{
//             products: obj
//         },
//         path: './docs/' + fileName
//     }

//     pdf.create(document, options).then(res => {
//         console.log(res)
//     }).catch(error => {
//         console.log(error)
//     })
//     const filePath = `http://localhost:${process.env.PORT}/docs/${fileName}`

//     res.send("File downloading")
// }

// export {
//     generatePdf,
//     homeView
// }