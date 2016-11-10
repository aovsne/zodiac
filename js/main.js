// Set Array for the zodiac signs and give them their properties and values
zodiacArray =[
	{
		name: 'AQUARIUS',
		image: "img/aquarius.jpg",
		content: "You're best attributes are: Knowledge, Humanitarian, Serious, Insightful, Duplicitous"
	},
	{
		name: 'PISCES',
		image: 'img/pisces.jpg',
		content: "You're best attributes are: Fluctuation, Depth, Imagination, Reactive, Indecisive"
	},
	{
		name: 'ARIES',
		image: 'img/aries.jpg',
		content: "You're best attributes are: Active, Demanding, Determined, Effective, Ambitious"
	},
	{
		name: 'TAURUS',
		image: 'img/taurus.jpg',
		content: "You're best attributes are: Security, Subtle strength, Appreciation, Instruction, Patience"
	},
	{
		name: 'GEMINI',
		image: 'img/gemini.jpg',
		content: "You're best attributes are: Communication, Indecision, Inquisitive, Intelligent, Changeable"
	},
	{
		name: 'CANCER',
		image: 'img/cancer.jpg',
		content: "You're best attributes are: Communication, Indecision, Inquisitive, Intelligent, Changeable"
	},
	{
		name: 'LEO',
		image: 'img/leo.jpg',
		content: "You're best attributes are: Ruling, Warmth, Generosity, Faithful, Initiative"
	},
	{
		name: 'VIRGO',
		image: 'img/virgo.jpg',
		content:"You're best attributes are: Analyzing, Practical, Reflective, Observation, Thoughtful"
	},
	{
		name: 'LIBRA',
		image: 'img/libra.jpg',
		content: "You're best attributes are: Balance, Justice, Truth, Beauty, Perfection"
	},
	{
		name: 'SCORPIO',
		image: 'img/scorpio.jpg',
		content: "You're best attributes are: Transient, Self-Willed, Purposeful, Unyielding"
	},
	{
		name: 'SAGITTARIUS',
		image: 'img/saggitarius.jpg',
		content: "You're best attributes are: Philosophical, Motion, Experimentation, Optimism"
	},
	{
		name: 'CAPRICORN',
		image: 'img/capricorn.jpg',
		content: "You're best attributes are: Determination, Dominance, Perservering, Practical, Willful"
	}
]
// getting the function getInfo from HTML to work
function getInfo(){
	// setting variable for the id(zodiac) from HTML input as starSign
	var starSign = document.getElementById('lulu').value.toUpperCase()

	// now putting the Array on loop so that it could go through every elements from the Array list
	for(i = 0; i < zodiacArray.length; i++){
		if(starSign == zodiacArray[i].name){
			document.getElementById('karma').innerHTML = starSign
			document.getElementById('image').src = zodiacArray[i].image
			document.getElementById('content').innerHTML = zodiacArray[i].content
      
			return
		}
    
	}
	document.getElementById('karma').innerHTML = 'This is not a zodiac Sign, Please Try Again!'
	document.getElementById('image').src = 
	document.getElementById('content').innerHTML = ''
  

}

// zodiac animation 
function randomNumber(max, min = 1) {
  return parseInt(Math.random() * max) + min;
}

class Point {
  constructor(maxWidth, maxHeight) {
      this.radio = randomNumber(3);
      this.position = {
          x: randomNumber(maxWidth),
          y: randomNumber(maxHeight),
        };
      const xStep = (randomNumber(2) > 1) ? randomNumber(1) : - randomNumber(1);
      const yStep = (randomNumber(2) > 1) ? randomNumber(1) : - randomNumber(1);
      // in case of some value is 0 lead to static point
      // we set it 1 if it is 0
      this.step = {
        x: xStep === 0 ? 1 : xStep,
        y: yStep === 0 ? 1 : yStep,
      };
   }

   move() {
      this.position.x = this.position.x + this.step.x;
      this.position.y = this.position.y + this.step.y;
   }
  
   getDistance(pointA, pointB) { 
     const positionB = pointB.position;
     const positionA = pointA.position;
     if (positionA.x === positionB.x && positionA.y === positionB.y) {
       return 0;
     }
     const distance = Math.sqrt(Math.pow(positionB.x - positionA.x, 2) + Math.pow(positionB.y - positionA.y, 2));
     // console.log(positionA, positionB, distance);
     return distance;
   }
  
   nearbys(points, threshold) {
     const nearbyPoints = [];
     for (let point of points) {
       const distance = this.getDistance(point, this);
       if ((distance < threshold) && (distance !== 0)) {
         nearbyPoints.push(point);
       }
     }
     
     return nearbyPoints;
   }
}

class Zodiac {
  constructor() {
    // get set canvas size
    // get drawing context...
    this.elm = document.querySelector('#zodiac');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.elm.setAttribute('width', this.width);
    this.elm.setAttribute('height', this.height);
    this.maxPoints = Math.ceil(Math.sqrt(this.width * this.height) / 4);

    this.ctx = this.elm.getContext('2d');

    this.createPoints();
    this.updatePosition();
  }

  createPoints() {
    this.points = [];
    for (let i = 0; i < this.maxPoints; ++i) {
      this.addPoint();
    }

    this.updateCanvas();
  }

  addPoint() {
    const point = new Point(this.width, this.height);
    this.points.push(point);
  }
  
  updateCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.strokeStyle = '#fff';
    this.ctx.fillStyle = '#fff';

    for (let point of this.points) {
      this.ctx.beginPath();
      this.ctx.arc(point.position.x, point.position.y, point.radio, 0, Math.PI * 2);
      const nearbyPoints = point.nearbys(this.points, 70);
      this.ctx.fill();
      this.ctx.beginPath();
      for (let nearbyPoint of nearbyPoints) {
        this.ctx.moveTo(point.position.x, point.position.y);
        this.ctx.lineTo(nearbyPoint.position.x, nearbyPoint.position.y);
      }
      this.ctx.stroke();
    }
  }

  updatePosition() {
    setTimeout(() => {
      for (let point of this.points) {
        point.move();
        if ((point.position.x > this.width) || (point.position.y > this.height) || (point.position.x < 0) || (point.position.y < 0)) {
          this.points.splice(this.points.indexOf(point), 1);
          this.addPoint();
        }
      }
      requestAnimationFrame(() => {
        this.updateCanvas();
      });
      this.updatePosition();
    }, 50);
  }
}

new Zodiac();
// adding jquery effects!!
$(document).ready(function(){
  $("button").click(function(){
    $("#karma").fadeIn(2000);
    $("#content").fadeIn(5000);
    $("#image").fadeIn(3000)
  })
})