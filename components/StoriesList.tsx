import React from 'react'
import { FlatList, Text } from 'react-native'
import StoryItem from './StoryItem'
interface StoriesListProps {
  stories: number[],
  onRefresh: () => void;
  refreshing: boolean;
}

const StoriesList: React.FC<StoriesListProps> = ({stories, onRefresh,refreshing}) => {
  return (
    <FlatList data={stories} renderItem={(item) => (<StoryItem storyId={item.item} />)} keyExtractor={(item) => item.toString()} onRefresh={onRefresh} refreshing={ refreshing }/>
    );
}
export default StoriesList