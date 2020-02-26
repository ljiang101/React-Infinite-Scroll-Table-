import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DefaultLayout from "../layouts/default";
import UserListQuery from "../components/UserQuery";

const Users = () => {
  return (
    <DefaultLayout>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Typography variant="h6">
            <div>
              <UserListQuery />
            </div>
          </Typography>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default Users;
