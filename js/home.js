let l2=0;
let l3=0;

function loadSearch(){
        spinnerActive();
    l2=0;
    l3=0;
    document.getElementById('b1').classList.remove('bg-primary')
    document.getElementById('b2').classList.remove('bg-primary')
    document.getElementById('b3').classList.remove('bg-primary')

   





    const searchInput=document.getElementById('input');
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInput.value}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
          const ctn=document.getElementById('count');
          const dd=data.data;
         ctn.innerText=`${dd.length}`;
        allIssues(data.data)});


   

}



function spinnerActive(){
    const spnr=document.getElementById('spinner');
    spnr.classList.remove('hidden');
    
}
function spinnerOff(){
    const spnr=document.getElementById('spinner');
    spnr.classList.add('hidden');
}

const loadAllIssues=()=>{
    const url='https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
    .then(res=>res.json())
    .then(data=>allIssues(data.data))
    // console.log('hello');
    
}

function bdr(obj){
    if(obj.status==='open'){
        return 'border1';
    }
    else{
        return 'border2';
    }
}
function date(dt){
    const newDate=new Date(dt);
    const day=newDate.getDay();
    const month=newDate.getMonth()+1;
    const year=newDate.getFullYear();
    return `${day}/${month}/${year}`;

}

function labelAdd(labels){
   return labels.map(label=>`<div class=" px-4 rounded-full bg-[#FFF8DB] text-[12px] font-medium">
                       <h2 class=""> ${label}</h2> </div>`).join(" ")
}

function loadDetails(id){
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>showDetails(data.data));
}
function showDetails(details){
    // console.log(details.title);
    const modalAdd=document.getElementById('modalAdd');
    modalAdd.innerHTML="";
    modalAdd.innerHTML=`
     <div class="space-y-2">
                <h2 class="font-bold text-2xl">${details.title}</h2>
                <ul class="flex items-center gap-6 flex-wrap">
                    <li class="bg-[#00A96E] text-white inline py-1 px-2 rounded-full">${details.status}</li>

                    <li class="text-[#64748B] font-[12px] list-disc">${details.status==='open'?'Opened by':'Closed by'} ${details.assignee}</li>
                    <li class="text-[#64748B] font-[12px] list-disc">${date(details.updatedAt)}</li>
                </ul>
                <div class="flex  gap-1 flex-wrap">
                   ${labelAdd(details.labels)}


                </div>
                <p class="text-[#64748B] font-[12px]">${details.description}</p>

                <div class="bg-[#F8FAFC] flex justify-between p-4 rounded-xl">
                    <div>
                        <p class="text-[#64748B] font-[12px]">Assignee:</p>
                        <h2 class="font-semibold">${details.assignee}</h2>
                    </div>
                    <div>
                        <p class="text-[#64748B] font-[12px]">Priority:</p>
                        <h2 class="text-white bg-[#EF4444] inline px-3 rounded-full">${details.priority.toUpperCase()}</h2>
                    </div>

                    <div></div>
                </div>
            </div>
    `;


    document.getElementById('my_modal_1').showModal();

}



const allIssues=(issues)=>{
    // console.log(issues);


    const cardContainer=document.getElementById('card-container');
    cardContainer.innerHTML="";
    
     for(const issue of issues){
     

        if(l2===1){
            if(issue.status==='closed'){
                continue ;
            }
        }
          if(l3===1){
            if(issue.status==='open'){
                continue ;
            }
        }

        const card=document.createElement('div');
        card.innerHTML=`
            <div id="c${issue.id}" onclick="loadDetails(${issue.id})" class="card h-full bg-white shadow-sm space-y-2 border-t-2 ${bdr(issue)}">
                <div class="flex justify-between  p-3 rounded-b-sm items-center">
                   ${issue.status==='open'? '<img class="img1" src="assets/Open-Status.png">':'<img class="img2" src="assets/Closed-Status.png">'}
                   
                    
                    <h2 class="px-4 rounded-full bg-[#FEECEC] text-[12px] font-medium text-[#EF4444]">${issue.priority.toUpperCase()}</h2>
                </div>
                <h2 class=" px-3 text-[14px] font-semibold">${issue.title}</h2>
                <p class="text-[#64748B]  px-3 text-[12px]">${issue.description}</p>

                <div class="flex pl-3 gap-1 flex-wrap">
                ${labelAdd(issue.labels)}
                   
                     
                </div>
                <hr class="w-full text-[#E4E4E7]">
                <p class=" px-3 text-[#64748B] text-[12px]">#${issue.id} by ${issue.author}</p>
                <p class=" px-3 pb-3 text-[#64748B] text-[12px]">${date(issue.createdAt)}</p>

            </div>
        `;
        cardContainer.append(card);
     }
     spinnerOff();

    
}

loadAllIssues();







function btn1(){
        const searchInput=document.getElementById('input');
        searchInput.value="";



    spinnerActive();
    l2=0;
    l3=0;
    document.getElementById('b1').classList.add('bg-primary')
    document.getElementById('b2').classList.remove('bg-primary')
    document.getElementById('b3').classList.remove('bg-primary')

    const ctn=document.getElementById('count');
    ctn.innerText='50';


    loadAllIssues();
    
}
function btn2(){
     const searchInput=document.getElementById('input');
        searchInput.value="";



    spinnerActive();
    l2=1;
    l3=0;
        document.getElementById('b1').classList.remove('bg-primary')
    document.getElementById('b2').classList.add('bg-primary')
    document.getElementById('b3').classList.remove('bg-primary')

    const ctn=document.getElementById('count');
    ctn.innerText='44';


    loadAllIssues();

    
    
}
function btn3(){
     const searchInput=document.getElementById('input');
        searchInput.value="";




    spinnerActive();
    l2=0;
    l3=1;
       document.getElementById('b1').classList.remove('bg-primary')
    document.getElementById('b2').classList.remove('bg-primary')
    document.getElementById('b3').classList.add('bg-primary')

    const ctn=document.getElementById('count');
    ctn.innerText='6';

    loadAllIssues();
    
    
}

