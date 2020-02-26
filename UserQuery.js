import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import GetUsers from "../graphQL/queries/get-users";
import { Users } from "./Users";

const UserListQuery = () => {
  const [requestParams, setRequestParams] = useState({
    skip: 0,
    take: 20,
    sort: null,
    filter: null
  });

  const { loading, error, data, fetchMore } = useQuery(GetUsers, {
    variables: requestParams
  });

  const fetchMoreData = () => {
    setRequestParams({
      skip: requestParams.skip + requestParams.take,
      take: 20,
      sort: null,
      filter: null
    });
    fetchMore({
      variables: { requestParams },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const { data } = prev.authorizationQuery.getAppUsers;
        const newData = [
          ...data,
          ...fetchMoreResult.authorizationQuery.getAppUsers.data
        ];
        if(requestParams.skip > 0)
          fetchMoreResult.authorizationQuery.getAppUsers.data = newData;
        return fetchMoreResult;
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div style={{marginTop: '10px'}}>
      <Users
        users={data.authorizationQuery.getAppUsers.data || []}
        onLoadMore={fetchMoreData}
      >
      </Users>
    </div>
  );
};

export default UserListQuery;
