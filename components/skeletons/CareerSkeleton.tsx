

function CareerSkeleton() {
  return (
   <div className="h-[80vh]">
     <div className="border  animate-pulse border-gray-800 shadow-lg lg:w-2xl mt-8 mx-auto rounded-sm p-4" >
      {
        [1,2,3].map((number) => (
              <article
              key={number}
                title={`View Job ID` }
                className="flex justify-around md:grid-cols-4 mx-auto  text-sm  border border- bg-gray-900/30 my-2   px-4 py-2 rounded-sm trans "
              >
                
                <div className="mb-2 flex-1 ">
                  <h3 className="bg-gray-900 h-4 w-16"></h3>
                  <p className="bg-gray-800 h-4 w-24 mt-2"></p>
                </div>
                <div className="mb-2 flex-1">
                  <h3 className="bg-gray-900 h-4 w-20"></h3>
                  <p className="bg-gray-800 h-4 w-24 mt-2"></p>
                </div>
                <div className="mb-2">
                  <h3 className="bg-gray-900 h-4 w-20"></h3>
                  <p className="bg-gray-600 h-4 w-14 mt-2" >
                    
                  </p>
                </div>
              </article>
        ))
      }
    </div>
   </div>
  ) 
}

export default CareerSkeleton
