const width = 800
const height = 500
const margin = {
    top: 10,
    bottom: 40,
    left: 80, 
    right: 10
}
const color=["#FF5733"]
const color2=["#355f8d"]
let mayor

let data2
const svg=d3.select("div#chart").append("svg").attr("width", width).attr("height",height)
const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)
const axisGroup = svg.append("g").attr("id", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup").attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)

const x=d3.scaleLinear().range([0, width-margin.left-margin.right])
const y=d3.scaleBand().range ([height-margin.top-margin.bottom, 0]).padding(0.1)

const xAxis=d3.axisBottom().scale(x)
const yAxis=d3.axisLeft().scale(y)


const formatTime=d3.timeParse("%Y")

d3.csv("data.csv").then(data=>{
    data2=data
    data.map(d=>{
        d.year = formatTime(d.year)
        d.winner=d.winner==""? "No hay ganador":d.winner
    })
    
    data2=d3.nest()
        .key(d=>d.winner)
        .entries(data)
    
        console.log(data)
    
     
    //console.log(data)
    //d3.values(data2)[i].values.length
    x.domain([0,d3.max (data2.map(d=>d.values.length))])
    y.domain((data2.map(d=>d.key)))
    mayor=d3.max(data2.map(d=>d.values.length))
    
    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

    let elements=elementGroup.selectAll("rect").data(data2)
    elements.enter()
        .append("rect")
        .attr("x",0)
        .attr("y", d=>y(d.key))
        .attr ("width", d=>x(d.values.length))
        .attr("height", y.bandwidth() )
        .attr ("fill",d=> (d.values.length)==mayor?color:color2)
    
    })
