// in package.json

->In app.json, we use "scheme" to deeplink our link so that it can be opened form any external links etc

->We use expo-router/entry for file based routing

-> use [rnfes] for react native starter pack

-> The files in [query] is a dynamic file in which the query can be changed and be paseed anythiung from any page and the query can be fetched by
[const {queryS} = useLocalSearchParams();]

-> we use tabBarIcon: which will return a callback which will rturn the TabIcons function we created, the tabBarIcon is also in the options in Tabs.Screen


-> <Tabs
    screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarStyle: {
            backgroundColor: "#161622",
            borderColor: '#561921',
        }
    }}
    >

-> visit the following chat link for more question:
    https://chatgpt.com/c/67ac7ab6-8d40-800f-87d6-c9b6b98cfc8c

-> we use [source] in native for Image element

-> [activeOpacity] attribute for setting the opacity of touchable button when it's touched


-> look at the FormFiled component in the aora app for form inputs

-> ScrollView don't support both horizontal and vertical view at the same time but flatLists do

-> React Native - a framework used to build
amazing Android and iOS native mobile
applications using the library you already know
all about - React.js.

->React Native is a cross-platform library that
allows you to build native mobile apps using
React & JavaScript.

->React Native has built-in components compiled
to native UI components,
[React native is a mobile app developement framework by fb, for multi platform apps]
-> we can code in js or Ts for react native

-> State in react native is used to store data that can be changed over time, and it is used to re-render the component when the state changes.

-> props are immutable

-> pure components are those which produce same output for same state and props, they should not be editable

-> shadowDOM is not a complete copy of real dom like virtual DOM

->controlled components are better because they are more flexible and can be used in multiple places and can be used to validate the input data, we can use props, or callback fncs to take more control of the components, uncontrolled components are handeled by the dom itself, and can't be controlled by react state

-> The differences between Flatlist and scrollVie are that: 
1) Flatlist is used to render a list of items, while ScrollView is used to render a list of items that can be scrolled.
2) Flatlist is more efficient than ScrollView because it only renders the items that are currently visible on the screen, while ScrollView renders all the items at once.
3) Flatlist has built-in support for lazy loading and infinite scrolling, while ScrollView does not.



-> lazy loading is a technique used to defer the loading of non-essential resources at page load time. Instead, these resources are loaded only when they are needed.

-> Gesture responder system is a system that allows components to respond to touch events, such as taps, swipes, and pinches.

-> below are examples of some touchable elements in react native:
1) TouchableOpacity
2) TouchableHighlight
3) TouchableWithoutFeedback
4) TouchableNativeFeedback


-> react native is reusable, modular, testable, scalable because it has a component based architecture and it uses a virtual DOM to render the UI. It also has a rich ecosystem of libraries and tools that make it easy to build and maintain large-scale applications.

-> hooks are functions that allow you to use state and other React features in functional components. They are a more modern and flexible way to work with state and side effects in React components.

-> useState is a hook that allows you to add state to functional components. It returns an array with two elements: the current state value and a function that allows you to update the state.

-> useEffect is a hook that allows you to perform side effects in functional components. It runs after every render and can be used to fetch data, subscribe to events, or update the DOM.
[side effects can be anything like fetching api, setting timer, updating dom etc]

-> when we use useeffect without any dependency array it will run after every render, but if we use an empty array it will run only once after the first render, and if we use a dependency array it will run after every render when the dependency changes.

useEffect(() => {
    // code to run after every render
});

useEffect(() => {
    // code to run only once after the first render
}, []);

useEffect(() => {
    // code to run after every render when the dependency changes
}, [dependency]);

-> useContext is a hook that allows you to access the value of a context provider in a functional component. It is used to avoid prop drilling and make it easier to share data between components.

-> useRef is a hook that allows you to create a mutable reference to a DOM element or a value that persists between renders. It is useful for accessing DOM elements, managing focus, and storing mutable values. it prevents multiple renders of the component, it's used to modify dom elements directly


-> useMemo is a hook that allows you to memoize the result of a function so that it is only recomputed when its dependencies change. It is useful for optimizing performance by avoiding unnecessary calculations.

example of useMemo is: 
const memoizedValue = useMemo(() => {
    return computeExpensiveValue(a, b)
    }, [a, b]);
now we will store the value of computeExpensiveValue in memoizedValue and it will only be recomputed when a or b changes and not on every render
now we will use memoizedValue in our component

-> useCallback is a hook that allows you to memoize a function so that it is only recreated when its dependencies change. It is useful for optimizing performance by avoiding unnecessary function recreations.

-> the main difference between useMemo and useCallback is that useMemo memoizes the result of a function, while useCallback memoizes the function itself.

-> React.memo is a higher-order component that memoizes a functional component’s output. It is similar to PureComponent for class components and is used to optimize performance by preventing unnecessary re-renders.


-> flatlist accepts data as an array just like .map in js, and renderItem as a function that returns the item to be rendered, and keyExtractor as a function that returns the key of the item

-> Hot reloading is a feature that allows you to update your code in real-time without losing the state of your application. It is useful for quickly iterating on your code and seeing the changes immediately. It's very useful for developement