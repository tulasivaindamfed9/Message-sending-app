import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
// const user = useSelector((state: RootState) => state.auth.user);
// instead of writing the above commented line, as we have to define 
// the type of state every time we use useSelector, 
// we can create a custom hook that will automatically infer the type of state for us.
//  This is what useAppSelector does. LIKE below
// const user = useAppSelector((state) => state.auth.user);

// if we use usedispatch directly, we would have to define the type of dispatch
//  every time we use it. SO useAppDispatch is a custom hook that will automatically
//  infer the type of dispatch for us.