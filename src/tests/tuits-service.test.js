import {createUser, deleteUsersByUsername} from "../services/users-service";
import {createTuit, deleteTuit} from "../services/tuits-service";

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
  // TODO: implement this
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
});