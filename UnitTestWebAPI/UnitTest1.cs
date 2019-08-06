using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Results;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TMWebAPI.Controllers;
using TMWebAPI.Models;
using Newtonsoft.Json.Linq;
using NBench;

namespace UnitTestWebAPI
{
    [TestClass]
    public class UnitTest1
    {
        private Counter _opCounter;
        [TestMethod]
        public void Get()
        {
            var controller = new ValuesController();
            // Act on Test  
            var response = controller.Get();
            var contentResult = response as IEnumerable<ParentTaskModel>;
            // Assert the result  
            Assert.IsNotNull(contentResult);
        }
        [TestMethod]
        public void CreateParentTask()
        {
            var controller = new ValuesController();
            // Act on Test  
            
            ParentTaskModel parentTask = new ParentTaskModel()
            {
                ParentTaskName = "New Task",
            };

            IHttpActionResult response = controller.CreateParentTask(parentTask);
            var contentResult = response as OkNegotiatedContentResult<JObject>;
            // Assert the result  
            Assert.IsNotNull(contentResult);
        }
        [PerfSetup]
        public void SetUp(BenchmarkContext context)
        {
            _opCounter = context.GetCounter("MyCounter");
        }

        [PerfBenchmark(NumberOfIterations = 5, RunMode =RunMode.Throughput,RunTimeMilliseconds =1000,TestMode =TestMode.Measurement)]
        [CounterMeasurement("MyCounter")]
        [MemoryMeasurement(MemoryMetric.TotalBytesAllocated)]
        public void BenchMarkMethod(BenchmarkContext context)
        {
            Get();
            _opCounter.Increment();
        }
    }
}
