/**
 * @jest-environment jsdom
 */
import {Tuit} from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import '@testing-library/jest-dom'
import Tuits from "../components/tuits/index";

const MOCKED_USERS = [
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]

const MOCKED_TUITS = [
    {
        _id: "001",
        tuit: "alice's 2nd tuit",
        postedBy: {
            _id: "123123",
            username: "alice",
            password: "alice234",
            email: "alice@wonderland.com",
            salary: 50000,
            __v: 0,
            firstName: "Alicia",
            lastName: "Wonderland"
        },
        postedOn: "2022-02-22T03:42:55.654Z",
        __v: 0
    },
    {
        _id: "002",
        tuit: "alice's 1st tuit",
        postedBy: {
            _id: "123123",
            username: "alice",
            password: "alice234",
            email: "alice@wonderland.com",
            salary: 50000,
            __v: 0,
            firstName: "Alicia",
            lastName: "Wonderland"
        },
        postedOn: "2022-02-22T03:43:10.061Z",
        __v: 0
    },
];

test('tuit list renders static tuit array', () => {
    render(
        <HashRouter>
          <Tuits tuits={MOCKED_TUITS}/>
        </HashRouter>);
    const tuit = screen.getByText(/alice's 2nd tuit/i);
    expect(tuit).toBeInTheDocument();
});

test('tuit list renders async', async () => {
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    const tuit = screen.getByText(/alice's 2nd tuit/i);
    expect(tuit).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
    const mock = jest.spyOn(axios, 'get');
    mock.mockImplementation(() =>
        Promise.resolve({data: {tuits: MOCKED_TUITS}}));
    const res = await findAllTuits();
    const tuits = res.tuits;
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    const tuit = screen.getByText(/alice's 1st tuit/i);
    expect(tuit).toBeInTheDocument();
    mock.mockRestore();  // restore original implementation
});
