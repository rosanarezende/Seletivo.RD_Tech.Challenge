import { CustomerSuccessBalancing, Person } from './rd';

function array_to_map(arr: number[]): Person[] {
  let result = []
  for (let [i, num] of Object.entries(arr)) {
    const item = {
      id: Number(i) + 1,
      score: num
    }
    result.push(item)
  }
  return result
}

describe("CustomerSuccessBalancingTests", () => {
  it("test_scenario_one", () => {
    const css = [{ id: 1, score: 60 }, { id: 2, score: 20 }, { id: 3, score: 95 }, { id: 4, score: 75 }]
    const customers = [{ id: 1, score: 90 }, { id: 2, score: 20 }, { id: 3, score: 70 }, { id: 4, score: 40 }, { id: 5, score: 60 }, { id: 6, score: 10}]

    const balancer = new CustomerSuccessBalancing(css, customers, [2, 4])
    expect(balancer.execute()).toEqual(1)
  })

  it("test_scenario_two", () => {
    const css = array_to_map([11, 21, 31, 3, 4, 5])
    const customers = array_to_map( [10, 10, 10, 20, 20, 30, 30, 30, 20, 60])
    const balancer = new CustomerSuccessBalancing(css, customers, [])
    expect(balancer.execute()).toEqual(0) // por empate entre cs 1, 2 e 3
  })


  it("test_scenario_three", () => {
    let customer_success = Array.from({length: 1000}, () => 0);
    customer_success[998] = 100
    const customers = Array.from({length: 1000}, () => 10);  
    const balancer = new CustomerSuccessBalancing(array_to_map(customer_success), array_to_map(customers), [1000])
    setTimeout(() => {
      const result = balancer.execute()
      expect(result).toEqual(999)
    }, 1.0)
  })

  it("test_scenario_four", () => {
    const balancer = new CustomerSuccessBalancing(array_to_map([1, 2, 3, 4, 5, 6]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), [])
    expect(balancer.execute()).toEqual(0) // pq nenhum CS tem score para atender aos clientes
  })

  it("test_scenario_five", () => {
    const balancer = new CustomerSuccessBalancing(array_to_map([100, 2, 3, 3, 4, 5]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), [])
    expect(balancer.execute()).toEqual(1) // pq só o 1 tem score para atender os clientes
  })

  it("test_scenario_six", () => {
    const balancer = new CustomerSuccessBalancing(array_to_map([100, 99, 88, 3, 4, 5]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), [1, 3, 2])
    expect(balancer.execute()).toEqual(0) // pq depois de filtrar não sobrou nenhum CS com score para atender aos clientes
  })

  it("test_scenario_seven", () => {
    const balancer = new CustomerSuccessBalancing(array_to_map([100, 99, 88, 3, 4, 5]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), [4, 5, 6])
    expect(balancer.execute()).toEqual(3) // o CS de id 3 (cujo score é 88) é capaz de atender todos os clientes
  })
})
