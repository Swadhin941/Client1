import React from 'react';

const CalculateSubscription = (month, timezone) => {
    // console.log(month, timezone);
    const currentDate = new Date().toLocaleDateString("en-US", { timeZone: timezone }).split('/');
    let tempDate = parseInt(currentDate[1]);
    let tempMonth = parseInt(currentDate[0]);
    let tempYear = parseInt(currentDate[2]);
    // let tempDate = 22;
    // let tempMonth = 12;
    // let tempYear = 2024;
    let count = 0;
    let countMonth = parseInt(month)*30;
    let finalDate;
    for (let i = 0; i <= parseInt(month); i += 1) {
        if (tempMonth > 12) {
            tempYear += 1;
            tempMonth=1;
        }
        if(i===0){
            count = new Date(tempYear, tempMonth, 0).getDate()-tempDate;
            countMonth= countMonth-count;
        }
        else{
            if(new Date(tempYear, tempMonth, 0).getDate() === countMonth ){
                count+= new Date(tempYear, tempMonth, 0).getDate()
                countMonth= countMonth- new Date(tempYear, tempMonth, 0).getDate();
                finalDate= new Date(tempYear, tempMonth,0).getDate()
            }
            else if (new Date(tempYear, tempMonth, 0).getDate() >countMonth){
                count+=countMonth;
                finalDate= countMonth;
                countMonth=0;
            }
            else if (new Date(tempYear, tempMonth, 0).getDate() < countMonth){
                count+= new Date(tempYear, tempMonth, 0).getDate();
                countMonth = countMonth - new Date(tempYear, tempMonth, 0).getDate();
                finalDate= new Date(tempYear, tempMonth, 0).getDate();
            }
        }
        tempMonth+=1;
    }
    tempMonth-=1
    finalDate+=1;
    // console.log(count, countMonth, finalDate+1, tempMonth, tempYear);
    const dateformat = `${tempMonth}/${finalDate}/${tempYear}`;
    return dateformat

};

export default CalculateSubscription;