const express = require('express');
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const cors = require('cors');
const UserModel = require("./src/models/UserModel");
const AdminModel = require("./src/models/AdminModel");
const BookModel = require("./src/models/BookModel");
const BookmarkedBooks = require("./src/models/BookmarkedBooks");
const IssuedModel = require("./src/models/IssueLogModel");
const HistoryModel = require("./src/models/HistoryModel");
const NotReturnedModel = require("./src/models/BooksnotreturnedModel");
const Admin = require('./src/models/AdminModel');

mongoose.connect("mongodb+srv://lib_management:library@cluster0.merbxy7.mongodb.net/?retryWrites=true&w=majority").then(
    () => console.log("DB :)")
)

app.get('/', (req, res) => {
    res.send("Hello world!!!");
});

app.use(express.json());

app.use(cors({ origin: "*" }));

app.post('/register', async (req, res) => {
    try {
        const { rollNumber, email, password, confirmPassword, contact } = req.body;
        if (!/^\d{12}$/.test(rollNumber)) {
            return res.status(400).send("Invalid roll number");
        }
        let exist = await UserModel.findOne({ email });
        if (exist) {
            return res.status(400).send("user already exists");
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).send("Invalid email address");
        }
        if (password !== confirmPassword) {
            return res.status(400).send("Passwords dont match");
        }
        if (!/^\d{10}$/.test(contact)) {
            return res.status(400).send("Invalid contact");
        }
        let newUser = new UserModel({
            rollNumber,
            email,
            password,
            confirmPassword,
            contact
        });
        await newUser.save();
        res.status(200).send("User registered successfully");
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === 'admin@gmail.com') {
            let adminExist = await AdminModel.findOne({ email });
            if (adminExist.password !== password) {
                return res.status(400).send("Invalid password");
            }
            let adminPayload = {
                admin: {
                    id: adminExist.id
                }
            };
            jwt.sign(adminPayload, 'jwtSecret', { expiresIn: 3600000 },
                (err, token) => {
                    if (err) throw err;
                    return res.json({ token });
                });
        } else {
            let userExist = await UserModel.findOne({ email });
            if (!userExist) {
                return res.status(400).send("User not found");
            }
            if (userExist.password !== password) {
                return res.status(400).send("Invalid password");
            }
            let userPayload = {
                user: {
                    id: userExist.id
                }
            };
            jwt.sign(userPayload, 'jwtSecret', { expiresIn: 3600000 }, (err, token) => {
                if (err) throw err;
                return res.json({ token });
            });
        }
    } catch (err) {
        res.status(500).send("Internal server error");
    }
})

app.get('/myprofile', middleware, async (req, res) => {
    try {
        let exist = await UserModel.findById(req.user.id)
        if (!exist) {
            res.status(400).send("Token not found");
        }
        res.json(exist);
    }
    catch (err) {
        res.status(500).send("Invalid token");
    }
})

app.get('/Adminprofile', middleware, async (req, res) => {
    try {
        let exist = await AdminModel.findById(req.user.id)
        if (!exist) {
            res.status(400).send("Token not found");
        }
        res.json(exist);
    }
    catch (err) {
        res.status(500).send("Invalid token");
    }
})

app.get('/count', async (req, res) => {
    try {
        const c = await UserModel.countDocuments();
        res.json({ c });
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server errror");
    }
})

app.get('/registeredStudents', async (req, res) => {
    try {
        const registeredStu = await UserModel.find();
        res.json({ students: registeredStu });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.post('/addbook', async (req, res) => {
    try {
        const { title, author, isbn, genre, publishedDate, rating, image, quantity, status } = req.body;
        let exist = await BookModel.findOne({ isbn });
        if (exist) {
            return res.status(400).send("book already exists");
        }
        if (quantity === 0) {
            return res.status(400).send("Quantity should be greater than zero");
        }
        let newBook = new BookModel({
            title,
            author,
            isbn,
            genre,
            publishedDate,
            rating,
            image,
            quantity,
            status
        });
        await newBook.save();
        res.status(200).send("Book added");
    } catch (err) {
        console.error(err)
        return res.status(500).send("Internal server error");
    }
})

app.get('/bookcount', async (req, res) => {
    try {
        const bc = await BookModel.countDocuments();
        res.json({ bc });
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server errror");
    }
})

app.get('/registeredbooks', async (req, res) => {
    try {
        const registeredbooks = await BookModel.find();
        res.json({ books: registeredbooks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/BookDesc/:BookISBN', async (req, res) => {
    try {
        const bookISBN = req.params.BookISBN;
        const book = await BookModel.findOne({ isbn: bookISBN });

        if (book) {
            res.json(book);
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});


app.get('/UserDesc/:UserRoll', async (req, res) => {
    try {
        const userRoll = req.params.UserRoll;

        const user = await UserModel.findOne({ rollNumber: userRoll });

        if (user) {
            res.json(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.post('/changePassword', async (req, res) => {
    try {
        const { rollNumber, oldPassword, newPassword, confirmPassword } = req.body;
        let user = await UserModel.findOne({ rollNumber });
        if (oldPassword != user.password) {
            return res.status(400).send("Invalid Old password");
        }
        if (oldPassword === newPassword) {
            return res.status(400).send("New password cannot be same as the old password");
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).send("Passwords dont match");
        }
        user.password = newPassword;
        user.confirmPassword = newPassword;
        await user.save();
        res.status(200).send("Password Changed Successfully");
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
})

app.post('/editProfile', async (req, res) => {
    try {
        const { rollNumber, password, contact } = req.body;
        let user = await UserModel.findOne({ rollNumber });
        if (password != user.password) {
            return res.status(400).send("Invalid password");
        }
        if (!/^\d{10}$/.test(contact)) {
            return res.status(400).send("Invalid contact");
        }
        if (contact === user.contact) {
            return res.status(400).send("New Phone number cannot be same as the old Phone number");
        }
        user.contact = contact;
        await user.save();
        res.status(200).send("Contact Changed Successfully");
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
})

app.post('/borrow', async (req, res) => {
    const { userID, isbn } = req.body;
    try {
        //use the same as exists!!!!
        const bookCount = await IssuedModel.findOne({ userId: userID });
        if (bookCount && bookCount.books.length >= 5) {
            return res.status(400).send('You cannot borrow more than 5 books');
        }
        const book = await BookModel.findOne({ isbn });
        if (!book) {
            return res.status(404).send('Book not found');
        }
        if (book.quantity <= 0) {
            return res.status(400).send('Book is not available for borrowing');
        }
        const userIssuedEntry = await IssuedModel.findOne({ userId: userID, 'books.bookId': book._id });

        if (userIssuedEntry) {
            return res.status(400).send('User already borrowed the book');
        }
        let exist = await IssuedModel.findOne({ userId: userID })
        const currentDate = new Date();
        const returnDate = new Date(currentDate);
        returnDate.setDate(returnDate.getDate() + 10);
        if (!exist) {
            let issuedEntry = new IssuedModel(
                { userId: userID },
                {
                    $addToSet: {
                        books: {
                            bookId: book._id,
                            issuedDate: currentDate,
                            returnDate: returnDate,
                        },
                    },
                },
            )
            await issuedEntry.save();
        }

        const issuedEntry = await IssuedModel.findOneAndUpdate(
            { userId: userID },
            {
                $addToSet: {
                    books: {
                        bookId: book._id,
                        issuedDate: currentDate,
                        returnDate: returnDate,
                    },
                },
            },
        );
        await issuedEntry.save();

        res.status(200).json({ message: 'Book borrowed successfully', issuedEntry });
    } catch (error) {
        console.error('Error borrowing book:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.post('/bookmark', async (req, res) => {
    const { userID, isbn } = req.body;
    try {
        const book = await BookModel.findOne({ isbn });
        if (!book) {
            return res.status(404).send('Book not found');
        }
        const userBookmarkedEntry = await BookmarkedBooks.findOne({ userId: userID, 'books.bookId': book._id });

        if (userBookmarkedEntry) {
            await BookmarkedBooks.updateOne(
                { userId: userID },
                { $pull: { books: { bookId: book._id } } }
            );
            return res.status(200).send('Book removed from bookmarks');
        }
        let exist = await BookmarkedBooks.findOne({ userId: userID })
        if (!exist) {
            let bookmarkEntry = new BookmarkedBooks(
                { userId: userID },
                {
                    $addToSet: {
                        books: {
                            bookId: book._id,
                            bookmarkDate: new Date(),
                        },
                    },
                },
            )
            await bookmarkEntry.save();
        }
        const bookmarkEntry = await BookmarkedBooks.findOneAndUpdate(
            { userId: userID },
            {
                $addToSet: {
                    books: {
                        bookId: book._id,
                        bookmarkDate: new Date(),
                    },
                },
            },
        );
        await bookmarkEntry.save();

        res.status(200).send('Book Bookmarked success');
    } catch (error) {
        console.error('Error borrowing book:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/bookmarkedBooks/:UserID', async (req, res) => {
    try {
        const UserID = req.params.UserID;
        const bookmarkedBooks = await BookmarkedBooks.findOne({ userId: UserID });
        if (bookmarkedBooks) {
            const books = bookmarkedBooks.books.map(book => book.bookId);
            res.json(books);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/issuedBooks/:UserID', async (req, res) => {
    try {
        const UserID = req.params.UserID;
        const issuedBooks = await IssuedModel.findOne({ userId: UserID });
        if (issuedBooks) {
            const books = issuedBooks.books.map(book => book.bookId);
            res.json(books);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/bookissuedcount/:UserID', async (req, res) => {
    try {
        const UserID = req.params.UserID;
        const issuedBooks = await IssuedModel.findOne({ userId: UserID });
        if (issuedBooks && issuedBooks.books) {
            const bic = issuedBooks.books.length;
            res.json({ bic });
        }
        else {
            res.json({ bic: 0 });
        }
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server errror");
    }
})
app.get('/bookmarkcount/:UserID', async (req, res) => {
    try {
        const UserID = req.params.UserID;
        const bookmarkedBooks = await BookmarkedBooks.findOne({ userId: UserID });
        if (bookmarkedBooks && bookmarkedBooks.books) {
            const bmc = bookmarkedBooks.books.length;
            res.json({ bmc });
        }
        else {
            res.json({ bmc: 0 });
        }

    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server errror");
    }
})
app.get('/bookmarkcount', async (req, res) => {
    try {
        const result = await BookmarkedBooks.aggregate([
            {
                $unwind: '$books',
            },
            {
                $group: {
                    _id: null,
                    totalBooksIssued: { $sum: 1 },
                },
            },
        ]);
        const bmc = result.length > 0 ? result[0].totalBooksIssued : 0;
        res.json({ bmc })
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server errror");
    }
})

app.get('/issuedBooks1/:UserID', async (req, res) => {
    try {
        const UserID = req.params.UserID;
        const issuedBooks = await IssuedModel.findOne({ userId: UserID }).populate('books.bookId');
        if (issuedBooks) {
            const books = issuedBooks.books.map(book => book.bookId);
            res.json(books);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})


app.get('/bookmarkedBooks1/:UserID', async (req, res) => {
    try {
        const UserID = req.params.UserID;
        const bookmarkedBooks = await BookmarkedBooks.findOne({ userId: UserID }).populate('books.bookId');
        if (bookmarkedBooks) {
            const books = bookmarkedBooks.books.map(book => book.bookId);
            res.json(books);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.post('/updateHistory', async (req, res) => {
    const { userID, bookID } = req.body;
    try {
        let userHistory = await HistoryModel.findOne({ userId: userID });
        if (!userHistory) {
            userHistory = new HistoryModel({ userId: userID, books: [] });
        } else {
            const isBookAlreadyAdded = userHistory.books.some(book => book.bookId.equals(bookID));
            if (!isBookAlreadyAdded) {
                userHistory.books.push({ bookId: bookID, issuedDate: new Date() });
            }
        }
        await userHistory.save();
        res.status(200).json({ message: 'History updatd successfully' });
    } catch (error) {
        console.error('Error updating history:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/updateHistory1/:UserID', async (req, res) => {
    try {
        const UserID = req.params.UserID;
        const userhistory = await HistoryModel.findOne({ userId: UserID }).populate('books.bookId');
        if (userhistory) {
            const books = userhistory.books.map(book => book.bookId);
            res.json(books);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});


app.get('/historycount/:UserID', async (req, res) => {
    try {
        const UserID = req.params.UserID;
        const history = await HistoryModel.findOne({ userId: UserID });
        if (history && history.books) {
            const h = history.books.length;
            res.json({ h });
        }
        else {
            res.json({ h: 0 });
        }

    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server errror");
    }
})


app.get('/notreturnedcount/:UserID', async (req, res) => {
    try {
        const UserID = req.params.UserID;
        const notreturn = await NotReturnedModel.findOne({ userId: UserID });
        if (notreturn && notreturn.books) {
            const nrb = notreturn.books.length;
            res.json({ nrb });
        }
        else {
            res.json({ nrb: 0 });
        }

    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server errror");
    }
})

app.get('/allusersbookissuedpendingcount', async(req, res) => {
    try {
        const issuedbooks = await IssuedModel.find();
        const issuedc = {};
        issuedbooks.forEach(book => {
            issuedc[book.userId] = book.books.length;
        });
        const pendingbooks = await NotReturnedModel.find();
        const pendingc = {};
        pendingbooks.forEach(book => {
            pendingc[book.userId] = book.books.length;
        });
        res.json({issuedc:issuedc, pendingc:pendingc})

    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server errror");
    }
})

app.get('/allbookstakencount', async(req, res) => {
    try {
        const issuedbooks = await IssuedModel.find();
        const issued = {};
        issuedbooks.forEach(user => {
            user.books.forEach(book =>{
                if (book.bookId in issued){
                    issued[book.bookId] += 1
                }
                else{
                    issued[book.bookId] = 1
                }
            })
        });
        const pendingbooks = await NotReturnedModel.find();
        const pending = {};
        pendingbooks.forEach(user => {
            user.books.forEach(book =>{
                if (book.bookId in pending){
                    pending[book.bookId] += 1
                }
                else{
                    pending[book.bookId] = 1
                }
            })
        });
        res.json({issued:issued, pending:pending})

    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server errror");
    }
})


app.get('/copiestakencount', async(req, res) => {
    try {
        const issuedbooks = await IssuedModel.find();
        let takenc = 0;
        issuedbooks.forEach(user => {
            takenc += user.books.length
        });
        res.json({takenc})

    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server errror");
    }
})

app.get('/booktakenusers/:BookISBN', async(req, res) => {
    try {
        const bookISBN = req.params.BookISBN;
        const book = await BookModel.findOne({isbn: bookISBN});
        const bookID = book._id;
        const issuedbooks = await IssuedModel.find();
        const issued = [];
        for (const user of issuedbooks) {
            for (const book of user.books) {
                if (book.bookId.equals(bookID)) {
                    const userinfo = await UserModel.findOne({ _id: user.userId });
                    if (userinfo) {
                        issued.push(userinfo.rollNumber);
                    }
                }
            }
        }
        const pendingbooks = await NotReturnedModel.find();
        const pending = [];
        for (const user of pendingbooks) {
            for (const book of user.books) {
                if (book.bookId.equals(bookID)) {
                    const userinfo = await UserModel.findOne({ _id: user.userId });
                    if (userinfo) {
                        pending.push(userinfo.rollNumber);
                    }
                }
            }
        }
        res.json({issued:issued.sort(), pending:pending.sort()})

    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server errror");
    }
})

app.get('/checkNotReturned/:userID', async (req, res) => {
    const userId = req.params.userID;

    try {
        const issuedBooks = await IssuedModel.findOne({ userId }).populate('books.bookId');
        if (!issuedBooks) {
            return res.status(404).json({ message: 'No issued books found for the user.' });
        }
        let exist = await NotReturnedModel.findOne({ userId: userId });
        let totalFine = 0;
        for (const book of issuedBooks.books) {
            const returnDate = new Date(book.returnDate);
            const currentDate = new Date();
            if (returnDate <= currentDate) {
                if (!exist) {
                    exist = new NotReturnedModel({
                        userId,
                        books: [],
                    });
                }
                if (!exist.books) {
                    exist.books = [];
                }
                const existingBooksId = exist.books.map(existingBook => existingBook.bookId.toString());
                const isBookAlreadyAdded = existingBooksId.includes(book.bookId._id.toString());
                const daysDue = Math.ceil((currentDate - returnDate) / (1000 * 60 * 60 * 24));
                let fine = daysDue * 10;
                totalFine += fine;
                if (!isBookAlreadyAdded) {
                    exist.books.push({
                        bookId: book.bookId,
                        issuedDate: book.issuedDate,
                        returnDate: book.returnDate,
                        daysDue: daysDue,
                    });
                    await exist.save();
                }
                else {
                    await NotReturnedModel.findOneAndUpdate(
                        { userId: userId, "books.bookId": book.bookId },
                        { $set: { "books.$.daysDue": daysDue } }
                    );
                }

            }
        }
        const booksnotreturned = await NotReturnedModel.findOne({ userId: userId }).populate('books.bookId');
        if (booksnotreturned) {
            const books = booksnotreturned.books.map(book => book.bookId);
            res.json({ books, totalFine });
        } else {
            res.json({ books: [], totalFine: 0 });
        }
    } catch (error) {
        console.error('Error checking not-returned books:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/deleteUser/:userID', async (req, res) => {
    const userID = req.params.userID;
    try {
        let exist = await IssuedModel.findOne({userId: userID})
        if(exist){
            return res.status(400).send('User is already been issued book(s)\nCannot delete the User');
        }
        await UserModel.deleteOne({ _id: userID });
        await HistoryModel.deleteOne({ userId: userID });
        await BookmarkedBooks.deleteOne({ userId: userID });
        return res.status(200).send('User deleted successfully');

    } catch (error) {
        console.error('Error borrowing book:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/removeBook/:bookID', async (req, res) => {
    const bookID = req.params.bookID;
    try {
        let bookIssued = false
        const issuedbooks = await IssuedModel.find()
        issuedbooks.forEach(user => {
            user.books.forEach(book =>{
                if (book.bookId.equals(bookID)){
                    bookIssued = true
                    return;
                }
            })
            if(bookIssued){
                return;
            }
        });
        if(bookIssued){
            return res.status(400).send('Book is already been issued to user(s)\nCannot delete the Book');
        }


        const BookMarkedbooks = await BookmarkedBooks.find({ 'books.bookId': bookID });
        if (BookMarkedbooks.length > 0) {
            await BookmarkedBooks.updateMany(
                { 'books.bookId': bookID },
                { $pull: { books: { bookId: bookID } } }
            );
        }

        const HistoryBooks = await HistoryModel.find({ 'books.bookId': bookID });
        if (HistoryBooks.length > 0) {
            await HistoryModel.updateMany(
                { 'books.bookId': bookID },
                { $pull: { books: { bookId: bookID } } }
            );
        }

        await BookModel.deleteOne({ _id: bookID });

        
        return res.status(200).send('Book deleted successfully');

    } catch (error) {
        console.error('Error borrowing book:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/bookreturn', async (req, res) => {
    const {rollNumber, ISBN} = req.body;
    try {
        const User = await UserModel.findOne({rollNumber: rollNumber});
        const UserID = User._id;
        const Book = await BookModel.findOne({isbn: ISBN});
        const BookID = Book._id;

        const Issuedupdate = await IssuedModel.findOneAndUpdate(
            { userId: UserID },
            { $pull: { books: { bookId: BookID } } }
        )

        await Issuedupdate.save();

        const NotReturnedupdate = await NotReturnedModel.findOneAndUpdate(
            { userId: UserID },
            { $pull: { books: { bookId: BookID } } }
        )
        
        if(NotReturnedupdate)
        await NotReturnedupdate.save();

        return res.status(200).send('Updated successfully');

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.post('/updatebook/:id', async (req, res) => {
    const bookId = req.params.id;
    const { quantity } = req.body;

    try {
        const book = await BookModel.findById(bookId);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        const issuedCount = await IssuedModel.find({ books: { $elemMatch: { bookId: bookId } } }).countDocuments();
        if (quantity < issuedCount) {
            return res.status(400).send('Quantity cannot be less than the number of books currently issued');
        }

        book.quantity = quantity;
        await book.save();
        return res.status(200).send('Updated successfully');
    } catch (error) {
        console.error('Error updating book quantity:', error);
        return res.status(500).send('Internal Server Error');
    }
});

app.listen(5000, () => {
    console.log("Server running");
})