


function calculateAvgRating(reviews){

    const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0);
    console.log("totalrating : " , totalRating)
  const avgRating = totalRating === 0 ? '' : totalRating === 1 ?
   totalRating : (totalRating / reviews?.length).toFixed(1);


    console.log("avg    " ,  avgRating)


        return{
            totalRating,
            avgRating
        };
};
export default calculateAvgRating;