import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell
} from '@coreui/react'
import { object } from 'prop-types';

const Restaurant = () => {
const [restaurantData, setRestaurantData] = useState([]);

useEffect(()=> {
  const getRestaurants = async() => {
    const response = await Axios({
      url: 'http://localhost:1337/api/listrestaurant'
    });
    const listRestaurant = Object.keys(response.data).map(i=> response.data[i]);
    setRestaurantData(listRestaurant.flat());
  }
  getRestaurants();
},[]);

function handleCreateRestaurant(event){

}
const columns = [ 
  {
    title: 'Name',
    dataIndex: 'restaurantName'
  },
  {
    title: 'Nit',
    dataIndex: 'restaurantNit'
  },
  {
    title: 'Address',
    dataIndex: 'restaurantAddress'
  },
  {
    title: 'Phone',
    dataIndex: 'restaurantPhone'
  },
  {
    title: 'City',
    dataIndex: 'cityId'
  },
  {
    title: 'options',
    render: (text, record) =>(
      <div>

      </div>
    )
  }
]

  return (
    <div>
      <CButton onClick={handleCreateRestaurant}> New Restaurant </CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            {
              columns.map((column, index)=> (
                <CTableHeaderCell key= {index}> {column.title} </CTableHeaderCell>

              ))
            }
          </CTableRow>
        </CTableHead>
        <CTableBody>
            {
              restaurantData.map((restaurant, index) =>(
                <CTableRow key={index}>
                  {columns.map((column, columIndex)=> (
                    <CTableDataCell key={columIndex}> {restaurant[column.dataIndex]}</CTableDataCell>
                  ))}
                </CTableRow>
              ))
            }
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Restaurant