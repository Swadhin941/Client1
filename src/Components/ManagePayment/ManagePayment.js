import { React, useState, useEffect } from 'react'
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
    { id: 'email', label: 'Email', minWidth: 150 },
    { id: 'contact', label: 'Contact', minWidth: 150 },
    { id: 'amount', label: 'Amount (in Rs.)', minWidth: 150 },
    { id: 'vpa', label: 'VPA', minWidth: 150 },
    { id: 'method', label: 'Method', minWidth: 150 },
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
    const [transactions, setTransactions] = useState([])
    const [userId, setUserId] = useState()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [state, setState] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => {
        
    }, [])

    return (
        <Paper sx={{ width: '77%', overflow: 'hidden', margin: 'auto' }}>
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
                                        <StyledTableCell>{row.email}</StyledTableCell>
                                        <StyledTableCell>{row.contact}</StyledTableCell>
                                        <StyledTableCell >{(row.amount) / 100}</StyledTableCell>
                                        <StyledTableCell >{row.vpa}</StyledTableCell>
                                        <StyledTableCell >{row.method}</StyledTableCell>
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
