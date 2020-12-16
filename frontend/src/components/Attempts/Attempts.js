import React,{useEffect,useState} from 'react'
import Axios from 'axios';
import CodingProblem from '../Content/Tutorial/CodingProblem';
import MCQ from '../Content/Tutorial/MCQ';
import clsx from 'clsx';

import {render} from 'react-dom';
// import clsx from 'clsx';
// import Drawer from '@material-ui/core/Drawer';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomPaginationActionsTable(props) {
  const classes = useStyles2();
  // const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const [drawerData,setDrawerData]=useState({});
  const [data, setData] = useState([])
  
  const toggleDrawer = ( open,drawerdataTemp) => (event) => {
    console.log("asd")
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if(drawerdataTemp)
    {  
      setDrawerData(drawerdataTemp);
      setDrawer(open)
      
    }
    else setDrawer(open);
  };
  const showAttempt=()=>{

  if(!data||!drawerData) return "loading...";
    
  else   if(drawerData.attemptType==="CodingProblem"){
      
      return <CodingProblem attempt="true"  queryId={drawerData.problem} attemptData={drawerData}/>
    }
    else
    {  return <MCQ attempt="true"  queryId={drawerData.problem} attemptData={drawerData}/>
        
    }

  }
    useEffect(() => {
    //use for both problem specific and all problems
    const queryId=props.queryId?props.queryId:" ";
    const fetchData=async() => {
      await Axios.get(`/attempts/${queryId}`)
      .then((res)=>{
        console.log(res.data.data.attempts);
        setData(res.data.data.attempts)
      }) 
      .catch((err)=>console.log(err));
    };
    fetchData();

  }, [props])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };
  const getArr=()=>rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ;
  if(!data||data.length==0) return "";
  return (
    <TableContainer style={{marginTop:"90px"}} component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {(getArr()).map((row,index) => 
          (

           <TableRow onClick={toggleDrawer(true,row)} >
              <TableCell component="th" scope="row">
                {row.attemptType}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.attemptTitle}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.attemptResult==="correct"?<CheckIcon style={{color:"green"}} />:<CloseIcon style={{color:"red"}} />}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
          <Drawer open={drawer} onClose={toggleDrawer(false,0)}>
            {showAttempt()}
            <div id="renderAttempt">
            </div>
          </Drawer>
    </TableContainer>
  );
}
