import crontab from 'node-crontab';
import neo4j from 'neo4j';

const db = new neo4j.GraphDatabase('http://neo4j:1111@localhost:7474');

// This will call this function every 2 minutes
const sheduler = () => {
  crontab.scheduleJob('*/2 * * * *', () => {
    console.info("It's been 2 minutes!");
    const query = [
      'MATCH (p1:Person)-[x]->(r:Record)<-[y]-(p2:Person)',
      'WITH SUM(x.weight * y.weight) AS xyDotProduct,',
      'SQRT(REDUCE(xDot = 0.0, a IN COLLECT(x.weight) | xDot + a^2)) AS xLength,',
      'SQRT(REDUCE(yDot = 0.0, b IN COLLECT(y.weight) | yDot + b^2)) AS yLength,',
      'p1, p2',
      'MERGE (p1)-[s:SIMILARITY]-(p2)',
      'SET s.similarity = xyDotProduct / (xLength * yLength)',
    ];

    return db.cypher({ query: query.reduce((a, b) => `${a} ${b}`) }, (err, results) => {
      if (err) {
        console.error(err);
      }
      console.log('results: ', results);
    });
  });
};

export default sheduler;
