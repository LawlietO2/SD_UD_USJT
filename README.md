### Integrantes

Amanda Alves de Oliveira - RA: 820135445 <br>
Frederico Kenji Kaneto Monma - RA: 820148078 <br>
Jedaias Farias de Jesus - RA: 820146360 <br>
Mateus Oliveira Souza - RA: 820110893 <br>
Pedro Sérgio Oliveira Sousa - RA: 820150543 <br>
Rodrigo Peluso Craveiro - RA: 820273340 <br>
Victor Santos e Santos - RA: 820143889


-------      Barramento      -------

Nesta nova versão nos implementamos um barramento de eventos, cuja a finalidade é efetuar a comunicação entre os dois microsserviços existentes, para aumentar a eficiência do sistema, o funcionamento se dá da seguinte maneira: o primeiro microsserviço ao efetuar um cadastro no banco de dados, envia uma mensagem para o segundo microsserviço de fila, que então atualiza a lista de pacientes que tem na memoria cache, para que ao ser consultado pelo front-end o microsserviço de fila, não realize consultas desnecessárias base de dados. 

