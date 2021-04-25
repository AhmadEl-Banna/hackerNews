import { createSlice, createEntityAdapter ,createAsyncThunk, EntityState, PayloadAction, createSelector} from '@reduxjs/toolkit';
import hackerNewsService, { HackerNewsStory } from '../services/hackerNewsService';
import TopStories from '../screens/TopStories';
import { RootState } from '.';

const hackerNewsStoryEntity = createEntityAdapter<HackerNewsStory>({ selectId: (story) => story.id });

interface HackerNewsStoryState {
  ids: number[];
  stories: EntityState<HackerNewsStory>;
}

const initialState: HackerNewsStoryState = {
  ids: [],
  stories: hackerNewsStoryEntity.getInitialState()
}

export const fetchTopStories = createAsyncThunk('topStories/fetch', async (_param, { rejectWithValue }) => {
  try {
    const storiesIds = await hackerNewsService.getTopStories();
    return storiesIds;
  } catch (error) {
    return rejectWithValue(error)
  }
});

export const fetchStoryById = createAsyncThunk('topStories/fetchById', async (id: number, { rejectWithValue }) => {
  try {
    const story = await hackerNewsService.getStoryById(id);
    return story;
  } catch (error) {
    return rejectWithValue(error)
  }
});

const slice = createSlice({
  name: 'topStories',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchTopStories.fulfilled.type]: (state, { payload }: PayloadAction<number[]>) => {
      state.ids = payload;
    },
    [fetchStoryById.fulfilled.type]: (state, { payload }: PayloadAction<HackerNewsStory>) => {
      state.stories = hackerNewsStoryEntity.upsertOne(state.stories, payload)
    }
  }
});

const rootSelector = (state: RootState) => state.topStories;
const selectTopStoriesIds = createSelector(rootSelector, (state) => state.ids);
const entitySelectors = hackerNewsStoryEntity.getSelectors((state: RootState) => state.topStories.stories)

export const topStoriesSelectors = {...entitySelectors , selectTopStoriesIds}

export const hackerNewsStoriesReducer = slice.reducer;