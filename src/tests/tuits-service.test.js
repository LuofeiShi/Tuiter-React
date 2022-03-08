import {createUser, deleteUsersByUsername, findAllUsers} from "../services/users-service";
import {createTuit, deleteTuit, findTuitById, findAllTuits} from "../services/tuits-service";

describe('can create tuit with REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const testTuit = {
        tuit: 'what is up this is ellen here'
    };

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteUsersByUsername(ripley.username);
    });

    afterAll(() => {
        return deleteUsersByUsername(ripley.username);

    });

    test('can create tuit with createTuitByUser', async () => {
        // insert user
        const newUser = await createUser(ripley);

        // verify inserted user properties match sample user
        expect(newUser.username).toEqual(ripley.username);
        expect(newUser.password).toEqual(ripley.password);
        expect(newUser.email).toEqual(ripley.email);

        // insert tuit
        const newTuit = await createTuit(newUser._id, testTuit);

        // verify inserted tuit
        expect(newTuit.tuit).toEqual(testTuit.tuit);

        // delete tuit
        const status = await deleteTuit(newTuit._id);
        // verify deleted
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can delete tuit wtih REST API', () => {
    const testUser = {
        username: 'test1',
        password: 'test123',
        email: 'test@test.com'
    };

    const testTuit = {
        tuit: 'test1 test2 test3 test4___+++___1'
    };

    // setup test before running jest
    beforeAll(() => {
        return deleteUsersByUsername(testUser.username);
    });

    afterAll(() => {
        return deleteUsersByUsername(testUser.username);
    });

    test('can delete tuit with deleteTuit', async () => {
        // insert user
        const newUser = await createUser(testUser);

        // verify inserted user properties match sample user
        expect(newUser.username).toEqual(testUser.username);
        expect(newUser.password).toEqual(testUser.password);
        expect(newUser.email).toEqual(testUser.email);

        // insert tuit
        const newTuit = await createTuit(newUser._id, testTuit);

        // verify inserted tuit
        expect(newTuit.tuit).toEqual(testTuit.tuit);

        // delete tuit
        const status = await deleteTuit(newTuit._id);
        // verify deleted
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    const testUser = {
        username: 'test1',
        password: 'test123',
        email: 'test@test.com'
    };

    const testTuit = {
        tuit: 'test1 test2 test3 test4___+++___1'
    };

    // setup test before running jest
    beforeAll(() => {
        return deleteUsersByUsername(testUser.username);
    });

    afterAll(() => {
        return deleteUsersByUsername(testUser.username);
    });

    test('can retrieve a tuit by their primary key with findTuitById', async () => {
        // insert user
        const newUser = await createUser(testUser);

        // insert tuit
        const newTuit = await createTuit(newUser._id, testTuit);

        // verify inserted tuit
        expect(newTuit.tuit).toEqual(testTuit.tuit);

        // retrieve the tuit
        const findTuit = await findTuitById(newTuit._id);

        // verify find tuit
        expect(findTuit.tuit).toEqual(testTuit.tuit);

        // delete tuit
        const status = await deleteTuit(newTuit._id);
        // verify deleted
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve all tuits with REST API', () => {
    // TODO: implement this
    const testUser = {
        username: 'test1',
        password: 'test123',
        email: 'test@test.com'
    };

    const testTuits = ["test tuit 1", "test tuit 2", "test tuit 3"];

    const testTuit1 = {
        tuit: 'test tuit 1'
    };

    const testTuit2 = {
        tuit: 'test tuit 2'
    }

    const testTuit3 = {
        tuit: 'test tuit 3'
    }

    beforeAll(() => {
        return deleteUsersByUsername(testUser.username);
    });

    afterAll(() => {
        return deleteUsersByUsername(testUser.username);
    });

    test('can retrieve all tuits with findAllTuits', async () => {
        const newUser = await createUser(testUser);

        // insert tuits
        const newTuit1 = await createTuit(newUser._id, testTuit1);
        const newTuit2 = await createTuit(newUser._id, testTuit2);
        const newTuit3 = await createTuit(newUser._id, testTuit3);

        const tuits = await findAllTuits();

        const tuitsWeInserted = tuits.filter(
            tuit => testTuits.indexOf(tuit.tuit) >= 0);

        tuitsWeInserted.forEach(tuit => {
            const tuitContent = testTuits.find(tuitContent => tuitContent === tuit.tuit);
            expect(tuit.tuit).toEqual(tuitContent);
        });

        // delete tuit
        const status1 = await deleteTuit(newTuit1._id);
        const status2 = await deleteTuit(newTuit2._id);
        const status3 = await deleteTuit(newTuit3._id);
    });
});