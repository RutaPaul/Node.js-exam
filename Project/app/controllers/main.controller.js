exports.HandleResponse = (req, res, err, tableName) => {
if (err) {
    if (err.kind === "not_found") {
    res.status(404).send({
        message: `Not found ${tableName} with id ${req.params.id}.`
    });
    } else {
    res.status(500).send({
        message: `Could not delete ${tableName} with id : ${req.params.id}`
    });
    }
} else {
    res.send({ message: `${tableName} was deleted successfully!` });
}
}; 

exports.ValidateRequest = (req, res) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    };
  };