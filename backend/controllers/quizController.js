const QuizDb = require('../models/quizModel');
const QuizUser = require('../models/quizUser');

let QuizArr = [
  {
    id: '1',
    question: 'What is the Largest planet in our solar system.',
    answers: ['Saturn', 'Jupiter', 'Mars', 'Earth'],
    correctAns: ['Jupiter'],
    isMultipleAns: false,
  },
  {
    id: '2',
    question: 'What is the Smallest planet in our solar system.',
    answers: ['Venus', 'Mercury', 'Mars', 'Earth'],
    correctAns: ['Mercury'],
    isMultipleAns: false,
  },
  {
    id: '3',
    question: 'What is the Most Populated Country in the world.',
    answers: ['India', 'China', 'USA', 'France'],
    correctAns: ['India'],
    isMultipleAns: false,
  },
  {
    id: '4',
    question:
      'What is are the coiuntries with more than a billion in population.',
    answers: ['India', 'USA', 'China', 'Russia'],
    correctAns: ['India', 'China'],
    isMultipleAns: true,
  },
  {
    id: '5',
    question: 'What is the largest planet in our solar system.',
    answers: ['Saturn', 'Jupiter', 'Mars', 'Earth'],
    correctAns: ['Jupiter'],
    isMultipleAns: false,
  },
];
const updateQuiz = async function (req, res) {
  try {
    console.log('reachedd heree===', req.body);
    let doc = await QuizDb.findById(req.body._id);
    if (!doc) return res.status(400).send({ message: 'error' });
    doc.question = req.body.question;
    doc.correctAns = req.body.correctAns;
    doc.answers = req.body.answers;
    await doc.save();
    let allDoc = await QuizDb.find();
    console.log('allDoc==>', allDoc);
    return res.status(200).json({ data: allDoc });
  } catch (e) {
    return res.status(500).send({ message: 'internal server error' });
  }
};

const getQuiz = async function (req, res) {
  console.log('quiz data===');
  try {
    let data = await QuizDb.find();
    console.log('data==>', data);
    if (!data.length) {
      QuizArr.map(async (data) => {
        let newQuiz = new QuizDb(data);
        await newQuiz.save();
      });
    }
    return res.status(200).json({ data: data || QuizArr });
  } catch (e) {
    console.log('e', e);
    return res.status(500).send({ message: 'internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    console.log('req.body==', req.body);
    let UserModel = await QuizUser.create({
      userName: req.body.userName,
      phoneNumber: req.body.phoneNumber,
      score: req.body.score,
    });
    return res.status(201).send({ message: 'success' });
  } catch (e) {
    console.log('e', e);
    return res.status(500).send({ message: 'internal server error' });
  }
};

const fetchAllUser = async (req, res) => {
  try {
    let users = await QuizUser.find();
    return res.status(200).json({ data: users });
  } catch (e) {
    console.log('e', e);
    return res.status(500).send({ message: 'internal server error' });
  }
};

module.exports = { getQuiz, updateQuiz, createUser, fetchAllUser };
