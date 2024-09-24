import {users} from '../dummy-data/data.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const userResolver = {
    Mutation: {
        signUp: async (_, {input}, context) => {
            try {
                const { username, name, password, gender } = input;
                if (!username || !name || !password || !gender) throw new Error ('All fields required');

                const user = await User.findOne({username});
                 if (user) throw new Error ('User already exists');

                 const salt = await bcrypt.genSalt(10);
                 const hashedPassword = await bcrypt.hash(password, salt);

                 const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                 const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
                 
                 const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender === 'male' ? boyProfilePic : girlProfilePic
                 });

                 await newUser.save();
                 console.log(newUser);
                 await context.login(newUser);

                 return newUser;
            } catch (error) {
                console.log("Error in signupMutation: " + error);
                throw new Error(error.message || "Internal server error");
            }
        },

        login: async (_, { input }, context) => {
			try {
				const { username, password } = input;
				if (!username || !password) throw new Error("All fields are required");
				const { user } = await context.authenticate("graphql-local", { username, password });

				await context.login(user);
				return user;
			} catch (err) {
				console.error("Error in login:", err);
				throw new Error(err.message || "Internal server error");
			}
		},

        logout: async (_, __, context)  => {
            try {
                await context.logout();
                context.req.session.destroy((error) => {
                    if (error) throw error;
                });
                context.res.clearCookie("connect.sid");
                return { message: "Logged out successfully" }
            } catch (error) {
                console.log("Error in logoutMutation: " + error);
                throw new Error(error.message || "Internal server error");
            }
        }
    },
    Query: {
        authUser: async (_, __,context) => {
            try {
                const user = await context.getUser();
                return user;
            } catch (error) {
                console.log("Error in authUserQuery: " + error);
                throw new Error(error.message || "Internal server error");
            }
        },
        user: async (_, {userId}) => {
            try {
                const user = await User.findById(userId);
                return user;
            } catch (error) {
                console.log("Error in userQuery: " + error);
                throw new Error(error.message || "Error getting user");
            }
        }
    },
    // TODO: Create User/Transaction RELATION
}

export default userResolver;