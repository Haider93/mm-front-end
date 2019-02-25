import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MmServiceService } from '../mm-service.service';
import { NgControl } from '@angular/forms';
//import { EventEmitter } from 'events';
import {Config} from'../config';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {

  constructor(private mmService: MmServiceService) { }

  ngOnInit() {
    this.tokens = JSON.parse(localStorage.getItem('Token'));
    //this.token_to_logged = this.tokens[0]["token"];
  }

  config = new Config("1", "VOD","50", "5");
  tokens: any[];
  train_div_visible: boolean= true;
  show_logs_div_visible: boolean = true;
  token_selected: boolean = false;
  token_to_logged: string;
  train_logs: any[];
  test_logs:any[];
  token_to_logged_dataset:string;
  train_graph_x_axis:any[];
  train_graph_y_axis:any[];
  train_graph:any[];
  test_graph_x_axis:any[];
  test_graph_y_axis:any[];
  test_graph:any;
  wait_message_visible:boolean = false;
  

  onSubmit(config_val) {
    this.train_div_visible = false;
    //alert(config_val.mode+" "+config_val.dataset+" "+config_val.train_iter+" "+config_val.test_iter);
    this.train_div_visible = false;
    this.mmService.run_mm("1", config_val.dataset, config_val.train_iter, config_val.test_iter).subscribe((data: any) => {
      //this.token = data[data.length - 1];
      //console.log(data[data.length - 1]);
      //alert("Token :"+this.token["token"]);
      //localStorage.setItem('Token', JSON.stringify(data[data.length - 1]));
      alert(data);
      localStorage.setItem('Token', JSON.stringify(data));
      this.tokens = JSON.parse(localStorage.getItem('Token'));
    });
  }

  get_log(token_to_logged){
    //alert("Token Logged "+token_to_logged)
    this.mmService.get_train_log(token_to_logged).subscribe((data: any) => {
      if(data === [])
      {
        this.wait_message_visible = true;
      }
      this.train_logs = data;
      this.train_graph_x_axis = data.map(item => {
        return item.episode
      })
      this.train_graph_y_axis = data.map(item => {
        return item.pnl
      })

      this.train_graph = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.train_graph_x_axis,
          datasets: [{data:this.train_graph_y_axis,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
      
    });
    this.mmService.get_test_log(token_to_logged).subscribe((data: any) => {
      if(data === [])
      {
        this.wait_message_visible = true;
      }
      this.test_logs = data;
      this.test_graph_x_axis = this.test_logs.map(item => {
        return item.Episode_Id
      })
      this.test_graph_y_axis = this.test_logs.map(item => {
        return item.pnl
      })

      this.test_graph = new Chart('canvas1', {
        type: 'line',
        data: {
          labels: this.test_graph_x_axis,
          datasets: [{data:this.test_graph_y_axis,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }
  clear_token_list(){
    localStorage.clear();
  }

  select_token(token, dataset){
    this.train_logs = [];
    this.test_logs = [];
    this.train_graph = [];
    this.test_graph = [];
    this.token_to_logged = token;
    this.token_to_logged_dataset = dataset;
    this.token_selected = !this.token_selected;
    
  }
  
}
