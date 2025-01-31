import { UserType } from "../util/types";
import Connection from "./Connection";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchFriendRequests } from "../features/user/userSlice";
import { getFriendRequests, getFriends} from "../util/apiHelper";



export default function FriendsConnections() {

    const userStore = useAppSelector(store => store.user);
    const dispatch = useAppDispatch();

    const [friends, setFriends]: [UserType[], any] = useState([]);
    const [friendRequests, setFriendRequests]: [UserType[], any] = useState([]);

    useEffect(() => {
        getFriends().then((data) => {
            setFriends(data);
        })

        dispatch(fetchFriendRequests()).then(() => {
            setFriendRequests(userStore.friendRequests);
        })

    }, [userStore.friendRequests])

    return (
        <>
            <h2>Friend Requests</h2>
            {friendRequests.length > 0 ? (
                friendRequests.map(request => (
                    <Connection
                        key={request.id}
                        connection={request}
                    />
                ))
            ) : (
                <p>No pending friend requests.</p>
            )}

            <h2>Your Friends</h2>
            {friends.length > 0 ? (
                friends.map(friend => (
                    <Connection
                        key={friend.id}
                        connection={friend}
                    />
                ))
            ) : (
                <p>No friends yet.</p>
            )}
        </>
    );
}