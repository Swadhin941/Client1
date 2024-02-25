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
import Spinner from '../Spinner/Spinner'
import useAxiosSecure from '../CustomHook/useAxiosSecure/useAxiosSecure'
import toast from 'react-hot-toast'
import useTitle from '../CustomHook/useTitle/useTitle'
import { SharedData } from '../SharedData/SharedContext'
import DataSpinner from '../DataSpinner/DataSpinner'

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
    { id: 'Payment Id', label: 'Payment Id', minWidth: 150 },
    { id: 'Order Id', label: 'Order Id', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 150 },
    { id: 'Username', label: 'username', minWidth: 150 },
    { id: 'contact', label: 'Contact', minWidth: 150 },
    { id: 'amount', label: 'Amount (in Rs.)', minWidth: 150 },
    { id: 'Coins', label: 'Coins', minWidth: 150 },
    { id: 'Date & time', label: 'Date & time', minWidth: 150 },
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
    useTitle("Lookaura- Manage Payment");
    const { user } = useContext(SharedData);
    const [transactions, setTransactions] = useState([])
    const [userId, setUserId] = useState()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [state, setState] = useState(false)
    const [axiosSecure] = useAxiosSecure();
    const [dataLoading, setDataLoading]= useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => {
        setDataLoading(true);
        axiosSecure.get(`/allPayment?user=${user?.email}`)
            .then(res => res.data)
            .then(data => {
                setTransactions(data);
                setDataLoading(false);
            })
            .catch(error => {
                setDataLoading(false);
                toast.error(error.message);
            })
    }, [])

    if(dataLoading){
        return <DataSpinner></DataSpinner>
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '1.5rem', }}>
            <TableContainer sx={{ maxHeight: 550 }}>
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
                    {transactions ? (
                        <TableBody>
                            {(rowsPerPage > 0
                                ? transactions.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                : transactions
                            ).map((row) => {
                                return (
                                    <StyledTableRow role="checkbox" tabIndex={-1} key={row.code}>
                                        <StyledTableCell>{row.paymentId}</StyledTableCell>
                                        <StyledTableCell>{row.order_id}</StyledTableCell>
                                        <StyledTableCell>{row.email}</StyledTableCell>
                                        <StyledTableCell>{row.username}</StyledTableCell>
                                        <StyledTableCell>{row.phone_number}</StyledTableCell>
                                        <StyledTableCell >{(row.packagePrice)}</StyledTableCell>
                                        <StyledTableCell >{row.packageCoins}</StyledTableCell>
                                        <StyledTableCell ><div>{row.date}</div><div>{row.time}</div></StyledTableCell>
                                    </StyledTableRow>
                                )
                            })}
                        </TableBody>
                    ) : (
                        <div className='d-flex justify-content-center align-items-center w-100' >
                            <Spinner></Spinner>
                        </div>

                    )}
                </Table>
            </TableContainer>
            {transactions ? (
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={transactions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            ) : (
                ''
            )}
        </Paper>
    )
}
