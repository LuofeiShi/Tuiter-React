/**
 * @file This is the unit tests for my-dislikes-screen. Notice you need to change the package version to make it
 * works. I haven't push the package to the repo because the version works for this test will cause the crush of
 * the server. To run this test, you may want to update all the react related package to the newest version.
 */
import React from 'react'
import Tuits from "./tuits";
import Profile from "../components/profile/index"
import MyDislikes from "../components/profile/my-dislikes"
import {act, create} from "react-test-renderer"
import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";

const MOCKED_TUITS = [{tuit: "test tuit 1", postBy: "alice", _id: "00001", stats: {likes: 30, dislikes: 30}},
        {tuit: "bob's tuit", postBy: "bob", _id: "00002", stats: {likes: 100, dislikes: 50}}];

console.error = () => {};

/**
 * Test the render
 */
test('render dislikes tab on profile', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => render(
        <HashRouter>
            <Profile/>
        </HashRouter>
    ));

    const dislikeTab = screen.getByText(/Dislikes/i);
    expect(dislikeTab).toBeInTheDocument();
})

/**
 * Test the render for mock tuits
 */
test('renders a list of tuits on the screen', () => {
    let tuitsRender
    act(() => {
        tuitsRender = create(
            <Tuits
                tuits={MOCKED_TUITS}/>
        )
    })
    const root = tuitsRender.root
    // eslint-disable-next-line testing-library/await-async-query
    const ttrTuits = root.findAllByProps({
        className: 'ttr-tuit'
    })
    expect(ttrTuits.length).toBe(MOCKED_TUITS.length)
    ttrTuits.forEach((ttrTuit, ndx) => {
        // eslint-disable-next-line testing-library/no-node-access
        expect(ttrTuit.props.children).toBe(MOCKED_TUITS[ndx].tuit)
    })
})

/**
 * test the disliked tuits under the dislike tag on profile page
 */
test('renders disliked tuit on profile page', async () => {
    let tuitsRender
    act(() => {
        tuitsRender = create(
            <MyDislikes tuitList={MOCKED_TUITS}/>
        )
    })

    const root = tuitsRender.root
    // eslint-disable-next-line testing-library/await-async-query
    const ttrTuits = root.findAllByProps({
        className: 'tuit-content'
    })

    expect(ttrTuits.length).toBe(MOCKED_TUITS.length)
    ttrTuits.forEach((ttrTuit, ndx) => {
        // eslint-disable-next-line testing-library/no-node-access
        expect(ttrTuit.props.children[0]).toBe(MOCKED_TUITS[ndx].tuit)
    })
})