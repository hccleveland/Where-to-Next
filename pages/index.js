import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import $ from 'jquery';


export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   require('bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js');
  //   require('bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css')

  //   $('#calendar').datepicker({
  //     format: 'yyyy-mm-dd',
  //     // other options...
  //   });
  // },[])

  useEffect(() => {
    require('daterangepicker/daterangepicker.js')
    require('daterangepicker/daterangepicker.css')
    const $ = require('jquery/dist/jquery.js');

    const today = new Date();
    const minDate = today.toLocaleDateString('en-US');

    let startDate = document.querySelector('#startDate');
    let endDate = document.querySelector('#endDate');

    startDate.innerText = minDate;

    const calendar = $('#calendar').daterangepicker({
        opens: 'left',
        minDate: minDate
        }, function(start, end, label) {
          console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
          startDate.innerText = start.format('YYYY-MM-DD');
          endDate.innerText = end.format('YYYY-MM-DD');
      });
  },[])

  const handleSearch = () => {
    const origin = document.querySelector('#origin').value;
    const domestic = document.querySelector('#domestic').checked
    const oneway = document.querySelector('#oneWay').checked
    const budget = document.querySelector('#budget').value;
    const startDate = document.querySelector('#startDate').innerText;
    const endDate = document.querySelector('#endDate').innerText;

    const data = {
      origin: origin,
      domestic: domestic,
      oneway: oneway,
      budget: budget,
      startDate: startDate,
      endDate: endDate
    };

    router.push({
      pathname: '/results',
      query: { data: JSON.stringify(data) },
    });
  }

  return (
    <div>
      <input type='text' id='origin' placeholder='NYC' />
      <input type='text' id='budget' placeholder='Budget' />
      <input type="checkbox" id="domestic" name="domestic" />
      <label htmlFor="domestic">Domestic</label>
      <input type="text" id="calendar"/>

      {/* <div className="input-group date" data-provide="datepicker">
        <input type="text" id='calendar' />
        <div className="input-group-addon">
          <span className="glyphicon glyphicon-th"></span>
        </div>
    </div> */}
      <input type="checkbox" id="oneWay" name="oneWay" />
      <label htmlFor="oneWay">One Way</label>
      <br />
      <button type="button" className="btn btn-primary btn-lg" onClick={handleSearch}>Search</button>
      <div id='startDate' style={{display: 'none'}}></div>
      <div id='endDate' style={{display: 'none'}}></div>
    </div>
  );
}
