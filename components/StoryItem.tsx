import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React,{useEffect} from 'react';
import { StyleSheet, StyleProp, TouchableOpacity, View, ViewStyle, Text, ActivityIndicator } from 'react-native';

import Svg, { Ellipse } from 'react-native-svg';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { fetchStoryById, topStoriesSelectors } from '../store/hackerNewsStoriesSlice';


interface StoryItemProps {
  by:string;
  descendants: number;
  id: number;
  kids:number[];
  score:number;
  time: number;
  title: string;
  type:string;
  url: string;
  onClick: () => void
}
const StoryItem: React.FC<StoryItemProps> = ({ title, kids, by, url, score,time, onClick }) => {
  return (
    <View style={styles.rect}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemName} numberOfLines={2} ellipsizeMode="tail">
          {title ? title : "Title"}
        </Text>
        <Text style={styles.itemAuthor}>
          {`by :${by} ,${moment.unix(time).fromNow()}` }
        </Text>
        
        <Text style={styles.itemUrl} numberOfLines={2} ellipsizeMode="tail">
          {url ? url : "Text Added"}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onClick}
      >
        <View style={styles.commentsContainer}>
          <Svg style={styles.ellipse} viewBox="0 0 100 100">
            <Ellipse
              rx={50}
              ry={50}
              cx={50}
              cy={50}
              fill="rgba(249,205,175,1)"
            />
          </Svg>
          <Text style={styles.commentNumbers}>
            {kids ? kids.length : "NA"}
          </Text>
        </View>
        <View style={styles.upvotesContainer}>
          <Text style={styles.upvotes}>
            {score ? score : "NA"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    top: 0,
    left: 0,
    right: 51,
    height: 90,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "rgba(249,249,249,1)",
    opacity: 1,
    paddingRight: 55,
    alignSelf: "stretch"
  },
  itemName: {
    backgroundColor: "transparent",
    marginTop: 10,
    marginLeft: 10,
    fontSize: 14,
    color: "rgba(31,31,31,1)"
  },
  itemAuthor: {
    backgroundColor: "transparent",
    marginBottom: 0,
    marginLeft: 10,
    fontSize: 12,
    color: "rgba(148,148,148,1)"
  },
  itemUrl: {
    backgroundColor: "transparent",
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 12,
    color: "rgba(148,148,148,1)"
  },
  button: {
    top: 0,
    width: 51,
    height: 90,
    position: "absolute",
    backgroundColor: "rgba(245,245,245,1)",
    opacity: 1,
    right: 0
  },
  commentsContainer: {
    top: 112,
    left: 10,
    width: 32,
    height: 20,
    position: "absolute"
  },
  ellipse: {
    top: -100,
    left: 0,
    width: 32,
    height: 22,
    position: "absolute"
  },
  commentNumbers: {
    top: -94,
    left: 4,
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 10,
    color: "rgba(255,102,0,1)",
    width: 24,
    height: 12,
    textAlign: "center"
  },
  upvotesContainer: {
    top: 54,
    left: 0,
    right: 0,
    height: 20,
    position: "absolute",
    backgroundColor: "rgb(230,230,230)"
  },
  upvotes: {
    top: 4,
    left: 11,
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 10,
    textAlign: "center",
    color: "rgba(156,156,156,1)",
    width: 30,
    height: 12
  },
  rect: {
    backgroundColor: "#ffffff",
    height: 'auto',
    alignSelf: "stretch"
  }
});

interface StoryItemContainerProps {
  storyId: number;
}

const StoryItemContainer: React.FC<StoryItemContainerProps> = ({ storyId }) => {
  const dispatch = useAppDispatch();
  const story = useAppSelector(state => topStoriesSelectors.selectById(state, storyId));
  useEffect(() => {
    if (!story) {
      dispatch(fetchStoryById(storyId))
    }
  }, [story])
  if (!story) {
   return <ActivityIndicator size="small" color="#00ff00" /> 
  }
  return <StoryItem {...story} onClick={ () => {}}/>
}

export default StoryItemContainer