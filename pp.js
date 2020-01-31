//"use strict" ;

var termkit = require( 'terminal-kit' ) ;
var axios = require('axios') ;
var term = termkit.terminal ;

term.clear() ;

var document = term.createDocument( {
	palette: new termkit.Palette()
} ) ;

 //var text = {} ;
 var Counter = 0 ;
 var data={};
    data.TempExt= 26.7 ;
    data.Humidity= 38.6 ;
    data.AquaTemp= 26.12 ;
    data.LDR= 934 ;
    data.Count= 391 ;
    data.time = "wainting 1st ping" ; //(new Date).toLocaleTimeString() 

 setInterval( GetData , 30 * 1000)
 setInterval( PutData ,   5 * 1000);

 
async function GetData(){
	data.count = data.count + 1
	var resp = await axios({
		url: 'http://6303d247.ngrok.io',
		method: 'get'
	   })
   //console.log(resp)
   //data = JSON.parse(resp.data)
   //data = data.variables
   data = resp.data ;   
  // console.log(data)
    data.time = (new Date).toLocaleTimeString() 
  
}



async function PutData(){
	
	//console.log(counter)
  /*
  text = new termkit.Text( {
	parent: document ,
	//content: "Counter  : .. " + data.count ,
	content: data, 
	//contentHasMarkup: true ,
	x: 5 ,
	y: 5 ,
   } ) ;
   */
   
// console.log( pad(data.AquaTemp ))
 
   setText(5,05,"Counter  : .. " , pad(data.Count ))
   setText(5,06,"AquaTemp : .. " , pad(data.AquaTemp ),"red" )
   setText(5,07,"TempExt  : .. " , pad(data.TempExt ))
   setText(5,08,"LDR      : .. " , pad(data.LDR ))
   setText(5,09,"Humidity : .. " , pad(data.Humidity ))
   setText(5,10,"TimeGet  : .. " , data.Time  )

	
	
   setSignal(3,5,"="  )
   setSignal(3,6,"+" ,"red" )
   setSignal(3,7,"=" )
   setSignal(3,8,"◄" )
   setSignal(3,9,"="  )



  // setText(35,5,"Counter  : .. " + "Segs : " + (new Date).toLocaleDateString() )
   Counter = Counter + 1;
   setText(35,5,"Counter int : " , Counter  + "-- Time : " + (new Date).toLocaleTimeString() )
   setText(35,9,"Last Ping   : " , data.time )
   term.bell() ;

  /*
	un Dashboard con ups and down de las vaariables 
	algo parecido al de excel , con estadisticas y todo 
 
  */

}

function setSignal( x , y , content ,color){
	if (color == undefined ){
		color = 'magenta'
  	//attr: { color: 'magenta' } ,
	//attr: { color: 241 } ,
	//attr: { color: '*royal-blue' } ,
		  
	} 
	var bold = false ;
	if (color == "red" ){
		bold = true
	}

	new termkit.Text( {
		parent: document ,
		content: content,
		//contentHasMarkup: true ,
		x: x ,
		y: y ,
       attr: { color: color ,bold: bold  } ,
	   hidden: false,
	   width: 1 ,
	   height: 30

	} ) 

   //  console.log( text )

}

function setText( x , y , label , data ,color){
	if (color == undefined ){
		color = '*royal-blue'
  	//attr: { color: 'magenta' } ,
	//attr: { color: 241 } ,
	//attr: { color: '*royal-blue' } ,
		  
	} 
	var bold = false ;
	if (color == "red" ){
		bold = true
	}

	new termkit.Text( {
		parent: document ,
		content: label,
		//contentHasMarkup: true ,
		x: x ,
		y: y ,
		attr: { color: "green" , bold: true } ,
		hidden: false ,
		width: 15 ,
		height: 20,
    
	   } ) ;


	new termkit.Text( {
		parent: document ,
		content: data,
		//contentHasMarkup: true ,
	    x: x + 15 ,
		y: y  ,
       attr: { color: color ,bold: bold } ,
	   hidden: false ,
	   width: 40 ,
	   height: 20
	   } ) ;
		
}


term.on( 'key' , function( key ) {
	switch( key )
	{
		case 'CTRL_C' :
			term.grabInput( false ) ;
			term.hideCursor( false ) ;
			term.styleReset() ;
			//term.clear() ;
			process.exit() ;
			break ;
	}
} ) ;

/*
function pad(n, width, z) {
	z = z || ' ';
	width = width || 5 ;
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
*/

function pad( val ) {
   var str = val.toString() ;
   return str.padStart(5, ' '); 
}
