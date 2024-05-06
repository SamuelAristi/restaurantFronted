import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';   
import CIcon from '@coreui/icons-react';
import Axios from 'axios';
import {
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell
} from '@coreui/react';
import {
  cilPencil,
  cilTrash
} from '@coreui/icons'

const Restaurant = () => {
const [restaurantData, setRestaurantData] = useState([]);
const navigate = useNavigate();

useEffect(()=> {
  const getRestaurants = async() => {
    const response = await Axios({
      url: 'http://localhost:1337/api/listrestaurants'
    });
    const listRestaurant = Object.keys(response.data).map(i=> response.data[i]);
    setRestaurantData(listRestaurant.flat());
  }
  getRestaurants();
},[]);

function handleCreateRestaurant(event){
  navigate('/restaurants/restaurantform');

}

function handleEdit(restaurantId) {
  console.log(`/restaurants/restauranteditform/${restaurantId}`)
  navigate(`/restaurants/restauranteditform/${restaurantId}`);
}

const handleDisable = async(restaurantId) => {
  try{
    console.log(restaurantId)
    var url="http://localhost:1337/api/disiablerestaurant/"+ restaurantId;
    const response = await Axios.put(url);
    window.location.reload();
  }
  catch(e){
    console.log(e);
  }
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
      <CButton onClick={() => handleEdit(record.restaurantId)}>
       <CIcon icon={cilPencil}/>
      </CButton>
      <CButton onClick={() => handleDisable(record.restaurantId)}>
      <CIcon icon={cilTrash} />
      </CButton>
      </div>
    )
  }
]

  return (
    <div>
      <CButton onClick={handleCreateRestaurant}>New Restaurant</CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            {columns.map((column, index) => (
              <CTableHeaderCell key={index}>{column.title}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {restaurantData.map((restaurant, index) => (
            <CTableRow key={index}>
              {columns.map((column, columnIndex) => (
                <CTableDataCell key={columnIndex}>
                  {column.render ? column.render(restaurant[column.dataIndex], restaurant) : restaurant[column.dataIndex]}
                </CTableDataCell>
              ))}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );

}

export default Restaurant;