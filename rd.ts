export interface Person {
	id: number;
	score: number;
}

interface Match {
	customerId: number;
	csId: number;
}

export class CustomerSuccessBalancing {

	constructor(
		private customer_success: Person[], // Gerentes de Sucesso
		private customers: Person[], // clientes
		private customer_success_away: number[] // Ids dos gerentes de Sucesso indisponíveis
	) { }

	// ========= Descobrir o gerente de sucesso ideal para cada cliente =========
	getMatch(customerSucessList: Person[], customer: Person): number {
		let aux = 0
		let idCs = 0
		// vamos testar para casa gerente de sucesso
		for (let cs of customerSucessList) {
			let score = cs.score - customer.score
			// o score do agente de sucesso precisa ser maior do que o do cliente
			if (score >= 0) {
				// Se é o primeiro ou se ainda não tem nenhum CS atribuído
				if (idCs == 0) {
					idCs = cs.id;
					aux = score;
				}
				// senão, o score atual tem q ser menor q o do último
				else if (score < aux) {
					idCs = cs.id;
					aux = score;
				}
			}
		}
		return idCs
	}

		// ========= Descobrir o gerente de sucesso com mais clientes =========
		csWinner(customerSucessList: Person[], matchList: Match[]): number {
			let aux = 0
			let idCsWinner = 0
			for (let cs of customerSucessList) {
				let totalCustomers = matchList.filter(el => el.csId == cs.id).length;
				if (totalCustomers > 0) {
					// se for maior q o anterior, passa a ser o vencedor
					if (totalCustomers > aux) {
						idCsWinner = cs.id
						aux = totalCustomers
					}
					// mas se empatar, volta a não ter vencedor
					else if (totalCustomers == aux) {
						idCsWinner = 0
						aux = totalCustomers
					}
				}
			}
			return idCsWinner
		}

	// ========= MÉTODO PRINCIPAL =========
	execute(): number {
		const { customer_success_away, customers, customer_success, getMatch, csWinner } = this
		let matchs: Match[] = []

		// ========= Filtrar gerentes de sucesso disponíveis =========
		customer_success_away.forEach(csId => {
			// primeiro achamos cada um na lista de gerentes de sucesso
			const csAway = customer_success.findIndex(cs => cs.id == csId)
			// e o removemos
			customer_success.splice(csAway, 1);
		});

		// ========= Descobrir qual gerente de sucesso fica com qual cliente =========
		customers.forEach((customer) => {
			matchs.push({
				customerId: customer.id,
				csId: getMatch(customer_success, customer)
			});
		});

		// ========= Descobrir o gerente de sucesso vencedor =========
		return csWinner(customer_success, matchs)
	}

}
