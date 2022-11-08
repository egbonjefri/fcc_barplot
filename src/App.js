import {useState,useRef,useEffect} from 'react'
import * as d3 from 'd3'
import dataset from './dataset'



function App() {
   // eslint-disable-next-line
  const [newdataset, setDataset] = useState(dataset.dataset);
  const ref = useRef()
  useEffect(()=> {
    var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 1000 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;
const parseTime = d3.timeParse('%Y-%m-%d');
const dates = [];
for (let i =0; i < newdataset.length; i++) {
  
  dates.push(parseTime(newdataset[i][0]))
}
var domain = d3.extent(dates)
// append the svg object to the body of the page
var svg = d3.select(ref.current)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
const y = d3.scaleLinear()
  .range([0,height])
  .domain([18000, 0])
svg.append("g")
  .call(d3.axisLeft(y))
  .style('font',"12px sans-serif")


  var x = d3.scaleTime()
    .range([ 0, 900])
    .domain(domain)
  const tooltip = d3.select('body').append('div').attr('class','tooltip-style').style('opacity',0)
  const axisGenerator = d3.axisBottom(x)
  svg.append('g')
      .call(axisGenerator)
      .attr("transform", "translate(0," + height + ")")
      .style('font',"12px sans-serif")
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
//add text label for x axis
svg.append('text')
  .attr('transform', 'translate('+(width/1.3)+' ,'+(height+margin.top+40)+
')')
  .style('text-anchor', 'middle')
  .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
  .style('font',"16px sans-serif")
  .attr('fill', 'gray')
  svg.append('text')
  .attr('transform', 'translate('+(width/2)+' ,'+(height+margin.top+81)+
')')
  .style('text-anchor', 'middle')
  .text('Created by @egbonjefri for freeCodeCamp')
  .style('font',"16px sans-serif")
  .attr('fill', 'gray')
  svg.append('text')
     // eslint-disable-next-line
  .attr('transform', 'translate(470'+' ,'+(margin.top-60)+
')')
  .style('text-anchor', 'middle')
  .text('United States GDP (1947 - 2015)')
  .style('font',"26px sans-serif")
  .attr('fill', 'gray')
  svg.append('text')
   // eslint-disable-next-line
  .attr('transform', 'translate(-60'+' ,'+(margin.top+250)+
')rotate(-90)')
  .style('text-anchor', 'middle')
  .text('Gross Domestic Product (Million)')
  .style('font',"16px sans-serif")
  .attr('fill', 'gray')
//Bars
  svg.selectAll("myRect")
    .data(newdataset)
    .enter()
    .append("rect")
    .attr('x', d=> x(parseTime(d[0])))
    .attr('y', d=> (y(d[1])))
    .attr('width', 2.5)
    .attr('height',d=>height - y(d[1]))
    .attr("fill", "#69b3a2")
    .on('mouseenter', function(d,event){
      d3.select(this)
        .style('fill', 'black')
        tooltip.style('opacity',1)
               .text(function(){
                if(event[0].substring(5,7)==='01'){
                  return `${event[0].substring(0,4)} Q1 \n$${(event[1]/1000).toFixed(2)} Billion`
                }
                else if (event[0].substring(5,7)==='04') {
                  return `${event[0].substring(0,4)} Q2 \n$${(event[1]/1000).toFixed(2)} Billion`
                }
                else if (event[0].substring(5,7)==='07') {
                  return `${event[0].substring(0,4)} Q3 \n$${(event[1]/1000).toFixed(2)} Billion`
                }
                else{
                  return `${event[0].substring(0,4)} Q4 \n$${(event[1]/1000).toFixed(2)} Billion`
                }
              })
              tooltip.style('left', (d.pageX-100)+'px')
              tooltip.style('top', ((d.pageY)-135)+'px')

    })
    .on('mouseleave', function(d,event){
      d3.select(this).style('fill', '#69b3a2')
      tooltip.style('opacity', 0)
    })


  }

  , [newdataset])



  return (
    <div className="body">

         <svg style={{width:'80%', height:'100%'}} viewBox='-100 -100 800 1350' ref={ref} >
      
    </svg>
    </div>
  );
}

export default App;
