import TuitStats from "../components/tuits/tuit-stats";
import { act } from 'react-dom/test-utils';
import {screen, render, fireEvent} from "@testing-library/react";
import {HashRouter} from "react-router-dom";

// mock axios with the create
const mockAxios = jest.genMockFromModule('axios')
mockAxios.create = jest.fn(() => mockAxios)
mockAxios.get.mockImplementation(() =>
    Promise.resolve({ data: false }));

const MOCKED_TUIT =
    {
        tuit: "test tuit",
        postBy: "001",
        _id: "000001",
        stats:
            {
                likes: 212,
                dislikes: 121
            }
    };

const likeTuitMock = jest.fn();
const dislikeTuitMock = jest.fn();

test('tuit stats renders dislike button', async() => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async () => render(
        <HashRouter>
            <TuitStats tuit={MOCKED_TUIT} likeTuit={likeTuitMock} dislikeTuit={dislikeTuitMock}/>
        </HashRouter>
    ));

    const dislikeButton = screen.getByTestId('dislike-button');
    expect(dislikeButton).toBeInTheDocument();
})

test('tuit stats renders dislike stats', async() => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async () => render(
        <HashRouter>
            <TuitStats tuit={MOCKED_TUIT} likeTuit={likeTuitMock} dislikeTuit={dislikeTuitMock}/>
        </HashRouter>
    ));

    const dislikeStat = screen.getByText(/121/i);
    expect(dislikeStat).toBeInTheDocument();
})

test('click dislike button will trigger dislikeTuitMock function', async() => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async () => render(
        <HashRouter>
            <TuitStats tuit={MOCKED_TUIT} likeTuit={likeTuitMock} dislikeTuit={dislikeTuitMock}/>
        </HashRouter>
    ));

    const dislikeButton = screen.getByTestId('dislike-button');
    fireEvent.click(dislikeButton);
    expect(dislikeTuitMock).toHaveBeenCalledTimes(1);
})