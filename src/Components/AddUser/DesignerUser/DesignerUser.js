import { React, useState, useEffect, useContext } from 'react'
import { styled } from '@mui/material/styles'
import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    ListItemIcon,
    ListItemButton,
    Grid,
    Modal,
    Box,
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Icon } from '@iconify/react'
import { SharedData } from '../../SharedData/SharedContext'
import Spinner from '../../Spinner/Spinner'
import ViewUser from '../../Modals/ViewUser/ViewUser'
import EditUser from '../../Modals/EditUser/EditUser'
import DeleteUser from '../../Modals/DeleteUser/DeleteUser'
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure'
import toast from 'react-hot-toast'


const listItemBtn = {
    justifyContent: 'initial',
    px: 2.5,
}

const listItemIco = {
    minWidth: 0,
    justifyContent: 'center',
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#212529',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

const columns = [
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 150 },
    { id: 'storeName', label: 'Store Name', minWidth: 150 },
    {
        id: 'actions',
        label: '',
        minWidth: 150,
    },
]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: 5,
}

export default function StickyHeadTable() {
    const { user } = useContext(SharedData);
    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState()
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [state, setState] = useState(false)
    const [detailsUser, setDetailsUser] = useState(null);
    const [editUserDetails, setEditUserDetails] = useState(null);
    const [deleteUserDetails, setDeleteUserDetails] = useState(null);
    const [axiosSecure] = useAxiosSecure();
    const [reload, setReload]= useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }


    useEffect(() => {
        if (user?.role === 'admin') {
            axiosSecure.get(`/allDesigner?user=${user?.email}`)
                .then(res => res.data)
                .then(data => {
                    setUsers(data);
                })
                .catch(error=>{
                    toast.error(error.message);
                })
        }
    }, [reload, user])

    return (
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ paddingTop: 2 }}
        >
            <Paper sx={{ width: '77%', overflow: 'hidden', margin: 'auto' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <StyledTableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {users ? (
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? users.slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    : users
                                ).map((row) => {
                                    return (
                                        <StyledTableRow
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.code}
                                        >
                                            <StyledTableCell>
                                                {row.first_name} {row.last_name}
                                            </StyledTableCell>
                                            <StyledTableCell>{row.email}</StyledTableCell>
                                            <StyledTableCell>{row.storeName}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Grid container alignItems="center" spacing={0}>
                                                    <Grid item xs={4}>
                                                        <ListItemButton data-bs-target="#EditUser" data-bs-toggle="modal"
                                                            sx={listItemBtn}
                                                            onClick={() => {
                                                                setEditUserDetails(row)
                                                            }}
                                                        >
                                                            <ListItemIcon sx={listItemIco}>
                                                                <Icon
                                                                    color={'6A707F'}
                                                                    icon="ri:edit-fill"
                                                                    width="28"
                                                                    height="28"
                                                                />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <ListItemButton data-bs-target="#DeleteUser" data-bs-toggle="modal"
                                                            sx={listItemBtn}
                                                            onClick={() => {
                                                                setDeleteUserDetails(row)
                                                            }}
                                                        >
                                                            <ListItemIcon sx={listItemIco}>
                                                                <Icon
                                                                    color={'6A707F'}
                                                                    icon="ic:baseline-delete"
                                                                    width="28"
                                                                    height="28"
                                                                />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <ListItemButton data-bs-target="#ViewUser" data-bs-toggle="modal"
                                                            sx={listItemBtn}
                                                            onClick={() => {
                                                                setDetailsUser(row)
                                                            }}
                                                        >
                                                            <ListItemIcon sx={listItemIco}>
                                                                <Icon
                                                                    color={'6A707F'}
                                                                    icon="carbon:view-filled"
                                                                    width="28"
                                                                    height="28"
                                                                />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                    </Grid>
                                                </Grid>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        ) : (
                            <Spinner></Spinner>
                        )}
                    </Table>
                </TableContainer>
                {users ? (
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                ) : (
                    ''
                )}

                {/* Edit User Modal */}
                <EditUser editUser={editUserDetails} setEditUser={setEditUserDetails} reload={reload} setReload={setReload}></EditUser>

                {/* Delete User Modal */}
                <DeleteUser DeleteUser={deleteUserDetails} setDeleteUser={setDeleteUserDetails} reload={reload} setReload={setReload}></DeleteUser>

                {/* View User Modal */}
                <ViewUser DesignerDetails={detailsUser}></ViewUser>
            </Paper>
        </Grid>
    )
}
