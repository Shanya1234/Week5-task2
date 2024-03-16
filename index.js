const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const dbName = 'student_database';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    try {
        await client.connect();
        console.log('Connected to the MongoDB server');

        const database = client.db(dbName);

        const academicRecordsCollection = database.collection('academic_records');
        const coCurricularActivitiesCollection = database.collection('co_curricular_activities');

        const academicRecordResult = await academicRecordsCollection.insertOne({
            "student_id": "101",
            "name": "Shanya jain",
            "grades": { "Math": "A", "Science": "B" },
            "subjects": ["Math", "Science", "History"]
        });
        console.log('Inserted academic record with id:', academicRecordResult.insertedId);

        const coCurricularActivityResult = await coCurricularActivitiesCollection.insertOne({
            "student_id": "101",
            "name": "Shanya jain",
            "activity_type": "Sports",
            "duration": "1 year",
            "achievements": ["Winner of Volleyball Tournament", "Runner-up in Athletics"]
        });
        console.log('Inserted co-curricular activity with id:', coCurricularActivityResult.insertedId);

        // CRUD Operations below

        const academicRecords = await academicRecordsCollection.find({}).toArray();
        console.log('Academic Records:');
        console.log(academicRecords);

        const updateResult = await academicRecordsCollection.updateOne(
            { "student_id": "101" },
            { $set: { "grades.Math": "A+" } }
        );
        console.log('Updated academic record:', updateResult.modifiedCount);

        const deleteResult = await coCurricularActivitiesCollection.deleteOne({ "student_id": "101" });
        console.log('Deleted co-curricular activity:', deleteResult.deletedCount);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

main();
