import "dotenv/config"
import { ACNE_TYPE } from "@interfaces/enum.interface"
import { userRef, reviewRef, imageSubmissionRef, db } from "./firestore"
import { faker } from "@faker-js/faker"
import { ExtendedUser } from "@interfaces/model.interface"
import bcrypt from "bcrypt"

const USER_COUNT = 50
const REVIEW_COUNT = 1000
const IMAGE_SUBMISSION_COUNT = 100

const batch = db.batch()

const randomimage = () => {
    return `https://placehold.co/500/${faker.number.hex(16777215)}/${faker.number.hex(16777215)}.jpg?text=${faker.lorem.word()}`
}

const users: ExtendedUser[] = []
for (let i = 0; i < USER_COUNT; i++) {
    const name = faker.string.alphanumeric(20)
    const user: ExtendedUser = {
        id: name,
        username: name,
        password: faker.internet.password(),
        created_at: Date.now()
    }
    users.push(user)
}
const dummyUser: ExtendedUser = {
    id: "dummy",
    username: "aamtampan10",
    password: bcrypt.hashSync("ilovebukittinggi", 10),
    created_at: Date.now()
}
users.push(dummyUser)
console.log("users generated")


function seedUsers() {
    for (let i = 0; i < USER_COUNT + 1; i++) {
        const user = {
            username: users[i].username,
            password: users[i].password,
            created_at: users[i].created_at
        }
        batch.set(userRef.doc(users[i].id), user)
    }
    console.log("user batch set")
}

function seedReviews() {
    for (let i = 0; i < REVIEW_COUNT; i++) {
        const randomUser = faker.helpers.arrayElement(users)
        const randomUniqueUsersset = new Set(faker.helpers.arrayElements(users, {min: 1, max: 50}).map(user => user.id))
        const randomUniqueUsers = Array.from(randomUniqueUsersset)

        const review = {
            created_at: Date.now(),
            user_id: randomUser.id,
            user_username: randomUser.username,
            acne_type: faker.helpers.enumValue(ACNE_TYPE),
            body: faker.lorem.sentence({ min: 3, max: 50 }),
            upvote: randomUniqueUsers,
            upvote_count: randomUniqueUsers.length
        }
        batch.set(reviewRef.doc(), review)
    }
    console.log("review batch set")
}

function seedImageSubmissions() {
    for (let i = 0; i < IMAGE_SUBMISSION_COUNT; i++) {
        const randomUser = faker.helpers.arrayElement(users)
        const imageSubmission = {
            user_id: randomUser.id,
            created_at: Date.now(),
            image_url: randomimage(),
            acne_type: faker.helpers.enumValue(ACNE_TYPE)
        }
        batch.set(imageSubmissionRef.doc(), imageSubmission)
    }
    console.log("imageSubmission batch set")
}

export async function seedDatabase() {
    seedUsers()
    seedReviews()
    seedImageSubmissions()
    await batch.commit()
    console.log("Database seeded successfully!")
}

seedDatabase()