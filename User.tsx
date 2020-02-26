import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import DataTable from "./common/DataTable";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const handleScroll = (
  { currentTarget }: { currentTarget: HTMLElement },
  onLoadMore: () => void
) => {
  if (
    currentTarget.scrollTop + currentTarget.clientHeight + 1 >=
    currentTarget.scrollHeight
  ) {
    if (onLoadMore) onLoadMore();
  }
};

interface UserProps {
  firstName: string;
  lastName: string;
  id: number;
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof UserProps;
  label: string;
  numeric: boolean;
}
const headCells: HeadCell[] = [
  // { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
  { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
];

export const Users = ({
  users=[],
  onLoadMore
}: {
  users: Array<UserProps>;
  onLoadMore: () => void;
}) => {
  const classes = useStyles();

  return (
    <TableContainer
      component={Paper}
      onScroll={e => handleScroll(e, onLoadMore)}
      style={{
        height: "800px",
        overflowY: "scroll",
        width: "800px"
      }}
    >
      <DataTable
        title="Users"
        default_sort_column="firstName"
        default_sort_order="asc"
        rows={users}
        headCells={headCells}
        keyField="firstName"
      />

    </TableContainer>
  );
};
