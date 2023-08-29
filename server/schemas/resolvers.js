const { AuthenticationError } = require('apollo-server-express');
const { Mood, User, Entry } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        user: async (parent, { username }) => {
            return User.findOne({ username: username });
        },
        moods: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Mood.find({}); //! findAll?? 
        },
        mood: async (parent) => {
            return Mood.find();
        },
        entries: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Entry.find({}); //! findAll?? 
        },
        entry: async (parent) => {
            return Entry.find();
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('myMood', 'myEntry');
            }
            throw new AuthenticationError('You need to be logged in!');
        },

    },
    Mutation: {
        addUser: async (parent, input) => {
            const { name, username, email, password } = input;
            const user = await User.create({ name, username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        updateUser: async (parent, { name, username }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $set: {
                            name: name,
                            username: username,
                        }
                    },

                    {
                        new: true,
                        runValidators: true,
                    }
                )
                return updatedUser;
            }
        },

        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('No user found with this username');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },

        addMood: async (parent, { feeling, scale, why, sticker, date }, context) => {
            if (context.user) {
                const mood = await Mood.create({ feeling, scale, why, sticker, date });
                const user = await User.findOneAndUpdate(
                    { username: context.user.username },
                    { $addToSet: { myMood: mood } },
                    { new: true }
                );

                return user;
            }
        },
        removeMood: async (parent, { moodId }) => {
            return Mood.findOneAndDelete({ _id: moodId });
        },
        addEntry: async (parent, { description, date }, context) => {
            if (context.user) {
                const entry = await Entry.create({ description, date });
                const user = await User.findOneAndUpdate(
                    { username: context.user.username },
                    { $addToSet: { myEntry: entry } },
                    { new: true }
                );

                return user;
            }
        },
        removeEntry: async (parent, { entryId }) => {
            return Entry.findOneAndDelete({ _id: entryId });
        },
    },
};

module.exports = resolvers;