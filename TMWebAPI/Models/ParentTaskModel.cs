using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMWebAPI.Models
{
    public class ParentTaskModel
    {
        public int ParentTaskID { get; set; }

        public string ParentTaskName { get; set; }

        public IEnumerable<TaskModel> Task { get; set; }
    }
}