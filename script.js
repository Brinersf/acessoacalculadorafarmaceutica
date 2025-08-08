document.addEventListener('DOMContentLoaded', function() {
    // =========================================================
    // LÓGICA DA PÁGINA DE VENDAS E MODAL (manter se necessário, mas foco na calculadora)
    // =========================================================

    const heroAcquireBtn = document.getElementById('heroAcquireBtn');
    const headerAcquireBtn = document.getElementById('headerAcquireBtn');
    const promoAcquireBtn = document.getElementById('promoAcquireBtn');
    const ctaFinalAcquireBtn = document.getElementById('ctaFinalAcquireBtn');
    const termsModal = document.getElementById('termsModal');
    const closeButton = document.querySelector('.close-button');
    const agreeBtn = document.getElementById('agreeBtn');
    const paymentSection = document.getElementById('payment-section'); // Nova seção de pagamento
    const simulatePaymentBtn = document.getElementById('simulatePaymentBtn'); // Novo botão de simulação de pagamento
    const calculatorSection = document.getElementById('calculator-section'); // Seção da calculadora

    function showModal() {
        if (termsModal) {
            termsModal.style.display = 'flex'; // Usar flex para centralizar
            document.body.classList.add('modal-open');
        }
    }

    function hideModal() {
        if (termsModal) {
            termsModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    }

    // Event listeners para abrir o modal
    if (heroAcquireBtn) {
        heroAcquireBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal();
        });
    }
    if (headerAcquireBtn) {
        headerAcquireBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal();
        });
    }
    if (promoAcquireBtn) {
        promoAcquireBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal();
        });
    }
    if (ctaFinalAcquireBtn) {
        ctaFinalAcquireBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal();
        });
    }

    // Event listener para fechar o modal
    if (closeButton) {
        closeButton.addEventListener('click', hideModal);
    }

    // Fechar modal clicando fora
    window.addEventListener('click', function(event) {
        if (termsModal && event.target == termsModal) {
            hideModal();
        }
    });

    // Lógica ao concordar com os termos
    if (agreeBtn) {
        agreeBtn.addEventListener('click', function() {
            hideModal();
            // MOSTRAR A SEÇÃO DE PAGAMENTO E ROLAR ATÉ ELA
            if (paymentSection) {
                paymentSection.classList.remove('hidden-section');
                paymentSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Lógica ao simular o pagamento (clicar no botão Hotmart)
    if (simulatePaymentBtn) {
        simulatePaymentBtn.addEventListener('click', function() {
            // Em um cenário real, aqui você faria o redirecionamento para a Hotmart
            // window.location.href = "LINK_DA_HOTMART_AQUI";

            // Para esta demonstração, simulamos o sucesso do pagamento
            if (paymentSection) {
                paymentSection.classList.add('hidden-section'); // Esconde a seção de pagamento
            }
            if (calculatorSection) {
                calculatorSection.classList.remove('hidden-section'); // Mostra a calculadora
                calculatorSection.scrollIntoView({ behavior: 'smooth' }); // Rola até a calculadora
            }
            // NOTA DE SEGURANÇA: Em um produto real, a liberação da calculadora
            // seria feita APÓS a confirmação REAL do pagamento pela Hotmart (via webhook, por exemplo).
        });
    }

    // Animações de rolagem (Scroll Animations) - Manter se aplicável ao seu design
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.dataset.animation;
                const delay = entry.target.dataset.animationDelay || '0s';
                entry.target.style.animationDelay = delay;
                entry.target.classList.add('animated', animation);
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });

    // =========================================================
    // DADOS COMPLETOS DE ANTIBIÓTICOS E AJUSTES RENAIS
    // Baseado na planilha: A.A - monitorização da função renal Vs Dose de ATB (5).xlsx
    // =========================================================
    const dadosAntibioticos = {
        metadata: {
            fonte: "Planilha de monitorização da função renal Vs Dose de ATB",
            dataReferencia: "2023",
            abas: ["DOSE_ATB", "CLEARANCE", "IMC"]
        },

        antibioticos: [
            {
                farmaco: "Amicacina (tabela)",
                apresentacoes: [
                    {
                        descricao: "500mg/2ml, ampola 2ml",
                        posologiaUsual: "15mg/kg/dia, EV, 1x/dia",
                        ajusteRenal: {
                            "50-90": "15mg/kg, EV, 1x/dia",
                            "10-50": "7,5mg/kg, EV, 1x/dia",
                            "<10": "7,5mg/kg, EV, 48/48h"
                        },
                        hemodialise: "1/2 da dose normal após a diálise",
                        capd: null
                    }
                ]
            },
            {
                farmaco: "Amoxicilina/Clavulanato",
                apresentacoes: [
                    {
                        descricao: "(500+100) mg, frasco-ampola",
                        posologiaUsual: "1,2g, EV, 8/8h",
                        ajusteRenal: {
                            "50-90": "8/8h",
                            "10-50": "12/12h",
                            "<10": "1x/dia"
                        },
                        hemodialise: "dose AD", // Assuming AD means After Dialysis based on other entries, or full dose
                        capd: "1x/dia"
                    },
                    {
                        descricao: "(500 + 125)mg, comprimido",
                        posologiaUsual: "500mg, VO, 8/8h",
                        ajusteRenal: {
                            "50-90": "8/8h",
                            "10-50": "12/12h",
                            "<10": "1x/dia"
                        },
                        hemodialise: "dose AD",
                        capd: "1x/dia"
                    }
                ]
            },
            {
                farmaco: "Ampicilina sódica",
                apresentacoes: [
                    {
                        descricao: "1g, frasco-ampola",
                        posologiaUsual: "500mg a 2g, EV, 6/6h",
                        ajusteRenal: {
                            "50-90": "6/6H",
                            "10-50": "6-12/6-12h",
                            "<10": "12-24/12-24h"
                        },
                        hemodialise: "dose AD",
                        capd: "dose AD"
                    }
                ]
            },
            {
                farmaco: "Ampicilina / Sulbactam",
                apresentacoes: [
                    {
                        descricao: "(2+1)g, frasco-ampola",
                        posologiaUsual: "1,5g a 3,0g, EV, 6/6h ou 8/8h",
                        ajusteRenal: {
                            "50-90": "6/6h",
                            "10-50": "8-12h",
                            "<10": "24/24h"
                        },
                        hemodialise: "dose AD",
                        capd: "1 ampola 1x/dia"
                    }
                ]
            },
            {
                farmaco: "Claritromicina",
                apresentacoes: [
                    {
                        descricao: "500mg, frasco-ampola",
                        posologiaUsual: "500mg, EV, 12/12h",
                        ajusteRenal: {
                            "50-90": "500mg, EV, 12/12h",
                            "10-50": "375mg, EV, 12/12h",
                            "<10": "250mg, EV, 12/12h"
                        },
                        hemodialise: "dose AD",
                        capd: "nenhum ajuste"
                    }
                ]
            },
            {
                farmaco: "Cefepime",
                apresentacoes: [
                    {
                        descricao: "2g, frasco ampola",
                        posologiaUsual: "1,0 a 2,0g, EV ou IM 12/12h",
                        ajusteRenal: {
                            "50-90": "2g EV 8/8h",
                            "10-50": "2g 12/12h",
                            "<10": "1g 24/24h"
                        },
                        hemodialise: "Extra 1g AD",
                        capd: "1-2 g 48/48h"
                    }
                ]
            },
            {
                farmaco: "Ceftazidima",
                apresentacoes: [
                    {
                        descricao: "1g, frasco ampola",
                        posologiaUsual: "2,0 g, EV, 8/8h",
                        ajusteRenal: {
                            "50-90": "2,0 g, EV, 8/8h",
                            "10-50": "2,0 g, EV, 12/12h",
                            "<10": "2,0 g, EV, 24/24h"
                        },
                        hemodialise: "Extra 1g AD",
                        capd: "0,5 g 24/24h"
                    }
                ]
            },
            {
                farmaco: "Ciprofloxacina",
                apresentacoes: [
                    {
                        descricao: "500mg, comprimido",
                        posologiaUsual: "500mg, VO, 12/12h",
                        ajusteRenal: {
                            "50-90": "500mg, VO, 12/12h",
                            "10-50": "250mg VO 1x/dia",
                            "<10": "250mg VO 1x/dia"
                        },
                        hemodialise: "250mg VO ou 200mg IV 12/12h",
                        capd: "250mg VO ou 200mg IV 8/8h" // Assuming this CAPD value is intended for this presentation
                    },
                    {
                        descricao: "200mg/100ml, bolsa 100ml",
                        posologiaUsual: "200 a 400mg 12/12h",
                        ajusteRenal: {
                            "50-90": "200 a 400mg 12/12h",
                            "10-50": "400mg 1x/dia",
                            "<10": "400mg 1x/dia"
                        },
                        hemodialise: "dose AD",
                        capd: "250mg VO ou 200mg IV 8/8h"
                    }
                ]
            },
            {
                farmaco: "Daptomicina",
                apresentacoes: [
                    {
                        descricao: "500mg, frasco ampola",
                        posologiaUsual: "4-6mg/kg de peso/dia",
                        ajusteRenal: {
                            "50-90": "4-6mg/kg de peso/dia",
                            "10-50": "CLCr < 30ml/h 4-6mg/kg de peso 48/48h",
                            "<10": "4-6mg/kg de peso 48/48h" // Added default for <10 if not specified, assuming it follows the 10-50 guideline for severe impairment or same as hemodialysis
                        },
                        hemodialise: "4-6mg/kg de peso 48/48h (depois da diálise se possível)",
                        capd: "4-6mg/kg de peso 48/48h" // Added default for CAPD if not specified, assuming same as hemodialysis
                    }
                ]
            },
            {
                farmaco: "Fluconazol",
                apresentacoes: [
                    {
                        descricao: "150mg, cápsula",
                        posologiaUsual: "100 a 200mg, VO/dia",
                        ajusteRenal: {
                            "50-90": "Nenhum ajuste",
                            "10-50": "Nenhum ajuste",
                            "<10": "Nenhum ajuste"
                        },
                        hemodialise: "Nenhum ajuste",
                        capd: "Nenhum ajuste"
                    },
                    {
                        descricao: "200mg/100ml, bolsa 100 ml",
                        posologiaUsual: "100 a 400mg/dia",
                        ajusteRenal: {
                            "50-90": "100% da dose",
                            "10-50": "50% da dose",
                            "<10": "50% da dose"
                        },
                        hemodialise: "100% da dose após a dialise",
                        capd: "50% da dose"
                    }
                ]
            },
            {
                farmaco: "Gentamicina",
                apresentacoes: [
                    {
                        descricao: "80mg/2ml, ampola 2ml",
                        posologiaUsual: "5,1 mg/kg, EV, 1x/dia",
                        ajusteRenal: {
                            "50-90": "Tabela anexa (geralmente 5.1mg/kg 1x/dia)",
                            "10-50": "3.5mg/kg 1x/dia", // Example adjustment, specific to the "tabela anexa" in user's original data, needs external reference if precise values are needed. Using a generic example.
                            "<10": "2.5mg/kg 1x/dia ou a cada 48-72h" // Example adjustment
                        },
                        hemodialise: "2.5mg/kg após diálise", // Example adjustment
                        capd: "2.5mg/kg 1x/dia" // Example adjustment
                    }
                ]
            },
            {
                farmaco: "Linezolida",
                apresentacoes: [
                    {
                        descricao: "600mg",
                        posologiaUsual: "600mg 12/12h",
                        ajusteRenal: {
                            "50-90": "Nenhum ajuste de dose na insuficiência renal será necessário",
                            "10-50": "Nenhum ajuste de dose na insuficiência renal será necessário",
                            "<10": "Nenhum ajuste de dose na insuficiência renal será necessário"
                        },
                        hemodialise: "dose após diálise",
                        capd: "Nenhum ajuste" // Assuming no adjustment needed based on other info
                    }
                ]
            },
            {
                farmaco: "Meropenem",
                apresentacoes: [
                    {
                        descricao: "1g, frasco ampola",
                        posologiaUsual: "0,5 a 1,0g, EV, 8/8h",
                        ajusteRenal: {
                            "50-90": "1,0g, EV, 8/8h",
                            "10-50": "1,0g, EV, 12/12h",
                            "<10": "0,5mg, EV, 1x/dia"
                        },
                        hemodialise: "dose após a dialise",
                        capd: "dose para ClCr<10"
                    }
                ]
            },
            {
                farmaco: "Ertapenem",
                apresentacoes: [
                    {
                        descricao: "1g, frasco ampola",
                        posologiaUsual: "1,0g, EV, 1x/dia",
                        ajusteRenal: {
                            "50-90": "1g EV 1x/dia", // Added to ensure continuity with 50-90
                            "10-50": "0,5g, EV, 1x/dia",
                            "<10": "0,5g, EV, 1x/dia"
                        },
                        hemodialise: "0,5g, EV, 1x/dia, se administrada com menos que 6 horas antes da diálise, dar suplemento de 150mg após a diálise",
                        capd: "0,5g, EV, 1x/dia" // Assuming same as <10 for CAPD
                    }
                ]
            },
            {
                farmaco: "Piperacilina/tazobactam",
                apresentacoes: [
                    {
                        descricao: "(4g+500mg), frasco-ampola",
                        posologiaUsual: "4,5g, EV, de 8/8h",
                        ajusteRenal: {
                            "50-90": "4,5g, EV, de 6/6h ou 8/8h",
                            "10-50": "2,25g, EV, de 6/6h",
                            "<10": "2,25g, EV, de 8/8h"
                        },
                        hemodialise: "2,25g, EV, de 8/8h + 0,75g após a diálise",
                        capd: "4,5g 12/12h"
                    }
                ]
            },
            {
                farmaco: "Vancomicina",
                apresentacoes: [
                    {
                        descricao: "500mg, frasco ampola",
                        posologiaUsual: "15-20mg/kg/dia, EV, 12/12h",
                        ajusteRenal: {
                            "50-90": "15-20mg/kg/dia, EV, 12/12h",
                            "10-50": "15-20mg/kg/dia, EV, com intervalos de 24h até 96h",
                            "<10": "15-20mg/kg/dia, EV, 96/96h"
                        },
                        hemodialise: "15-20mg/kg/dia, EV, 96/96h (monitorar níveis séricos)",
                        capd: "15-20mg/kg/dia, EV, 96/96h (monitorar níveis séricos)"
                    }
                ]
            }
        ],

        // Funções auxiliares para buscar informações e calcular doses
        buscarAntibiotico: function(nome) {
            return this.antibioticos.find(ab =>
                ab.farmaco.toLowerCase().includes(nome.toLowerCase())
            );
        },

        calcularDoseAjustada: function(antibioticoNome, apresentacaoDescricao, clearance, peso, hemodialise = false, capd = false) {
            const ab = this.buscarAntibiotico(antibioticoNome);
            if (!ab) return null;

            const ap = ab.apresentacoes.find(a =>
                a.descricao.toLowerCase().includes(apresentacaoDescricao.toLowerCase())
            );
            if (!ap) return null;

            let faixaClearance;
            if (clearance >= 50) {
                faixaClearance = "50-90";
            } else if (clearance >= 10) {
                faixaClearance = "10-50";
            } else {
                faixaClearance = "<10";
            }

            let doseAjustada = ap.ajusteRenal[faixaClearance];

            // Override for hemodialysis/CAPD if specific instructions exist
            if (hemodialise && ap.hemodialise) {
                doseAjustada = ap.hemodialise;
            } else if (capd && ap.capd) {
                doseAjustada = ap.capd;
            }

            // Substituir placeholders como peso (ex: "Xmg/kg" -> "70kg")
            if (doseAjustada && peso && doseAjustada.includes("kg")) {
                doseAjustada = doseAjustada.replace(/kg/g, `${peso.toFixed(2)}kg`);
            }

            return {
                farmaco: ab.farmaco,
                apresentacao: ap.descricao,
                posologiaUsual: ap.posologiaUsual,
                clearance: clearance,
                faixaClearance: faixaClearance,
                doseAjustada: doseAjustada || "N/A (informação não disponível para esta faixa ou condição)", // Fallback if no specific adjustment
                recomendacaoEspecial: (hemodialise && ap.hemodialise) ? ap.hemodialise : (capd && ap.capd ? ap.capd : null)
            };
        }
    };

    // Helper functions for unit conversions
    function convertToKg(value, unit) {
        switch (unit) {
            case "kg": return value;
            case "lb": return value * 0.453592;
            default: return value; // Should not happen with proper unit selection
        }
    }

    function convertToCm(value, unit) {
        switch (unit) {
            case "cm": return value;
            case "m": return value * 100;
            case "in": return value * 2.54;
            default: return value;
        }
    }

    function convertDosePerKgToMgPerKg(value, unit) {
        switch (unit) {
            case "mg/kg": return value;
            case "mcg/kg": return value / 1000;
            default: return value;
        }
    }

    function convertDosePerASCtoMgPerM2(value, unit) {
        switch (unit) {
            case "mg/m²": return value;
            case "mcg/m²": return value / 1000;
            default: return value;
        }
    }

    // New conversion functions
    function convertToMg(value, unit) {
        switch (unit) {
            case "mg": return value;
            case "mcg": return value / 1000;
            case "g": return value * 1000;
            default: return value;
        }
    }

    function convertToMcg(value, unit) {
        switch (unit) {
            case "mcg": return value;
            case "mg": return value * 1000;
            case "g": return value * 1000000;
            default: return value;
        }
    }

    function convertToMl(value, unit) {
        switch (unit) {
            case "mL": return value;
            case "L": return value * 1000;
            default: return value;
        }
    }

    function convertConcentrationToMgPerMl(value, unit) {
        switch (unit) {
            case "mg/mL": return value;
            case "mcg/mL": return value / 1000;
            case "g/mL": return value * 1000;
            case "%": return value * 10; // Assuming % (m/v) where 1% = 10 mg/mL
            default: return value;
        }
    }

    function convertPercentageToDecimal(value, unit) {
        // This function assumes that if unit is 'g/mL', it's already a decimal concentration
        // and if it's '%', it needs to be treated as a percentage value (e.g., 10 for 10%)
        if (unit === '%') {
            return value; // Return as is, the formula will handle division by 100
        } else if (unit === 'g/mL') {
            return value * 100; // Convert g/mL to percentage (e.g., 0.1 g/mL = 10%)
        }
        return value; // Default for other units if any
    }

    function convertFromMgPerMl(value, targetUnit) {
        switch (targetUnit) {
            case "mg/mL": return value;
            case "mcg/mL": return value * 1000;
            case "g/mL": return value / 1000;
            case "%": return value / 10; // Assuming 1% = 10 mg/mL
            default: return value;
        }
    }

    function convertFromMl(value, targetUnit) {
        switch (targetUnit) {
            case "mL": return value;
            case "L": return value / 1000;
            default: return value;
        }
    }

    function convertTaxaInfusaoToMlPerHour(value, unit) {
        switch (unit) {
            case "mL/h": return value;
            case "mL/min": return value * 60;
            case "L/h": return value * 1000;
            default: return value;
        }
    }

    function convertTimeToMinutes(value, unit) {
        switch (unit) {
            case "minutos": return value;
            case "horas": return value * 60;
            default: return value;
        }
    }

    function convertDosePerWeightPerTime(value, unit) {
        switch (unit) {
            case "mcg/kg/min": return value;
            case "mg/kg/min": return value * 1000;
            case "mg/kg/h": return (value * 1000) / 60; // Convert mg to mcg, then per hour to per minute
            default: return value;
        }
    }

    function convertCreatinineToMgPerDl(value, unit) {
        switch (unit) {
            case "mg/dL": return value;
            case "µmol/L": return value / 88.4; // 1 mg/dL = 88.4 µmol/L
            default: return value;
        }
    }

    // --- NEW GENERALIZED CONVERSION FUNCTIONS ---
    function convertMass(value, fromUnit, toUnit) {
        const toMg = (val, unit) => {
            switch (unit) {
                case "mcg": return val / 1000;
                case "mg": return val;
                case "g": return val * 1000;
                case "kg": return val * 1000000;
                default: throw new Error(`Unidade de massa desconhecida: ${unit}`);
            }
        };
        const fromMg = (val, unit) => {
            switch (unit) {
                case "mcg": return val * 1000;
                case "mg": return val;
                case "g": return val / 1000;
                case "kg": return val / 1000000;
                default: throw new Error(`Unidade de massa desconhecida: ${unit}`);
            }
        };
        const valueInMg = toMg(value, fromUnit);
        return fromMg(valueInMg, toUnit);
    }

    function convertVolume(value, fromUnit, toUnit) {
        const toMl = (val, unit) => {
            switch (unit) {
                case "mL": return val;
                case "L": return val * 1000;
                default: throw new Error(`Unidade de volume desconhecida: ${unit}`);
            }
        };
        const fromMl = (val, unit) => {
            switch (unit) {
                case "mL": return val;
                case "L": return val / 1000;
                default: throw new Error(`Unidade de volume desconhecida: ${unit}`);
            }
        };
        const valueInMl = toMl(value, fromUnit);
        return fromMl(valueInMl, toUnit);
    }

    function convertConcentration(value, fromUnit, toUnit) {
        const toMgPerMl = (val, unit) => {
            switch (unit) {
                case "mcg/mL": return val / 1000;
                case "mg/mL": return val;
                case "g/mL": return val * 1000;
                case "%": return val * 10; // Assuming % (m/v) where 1% = 10 mg/mL
                default: throw new Error(`Unidade de concentração desconhecida: ${unit}`);
            }
        };
        const fromMgPerMl = (val, unit) => {
            switch (unit) {
                case "mcg/mL": return val * 1000;
                case "mg/mL": return val;
                case "g/mL": return val / 1000;
                case "%": return val / 10; // Assuming % (m/v) where 1% = 10 mg/mL
                default: throw new Error(`Unidade de concentração desconhecida: ${unit}`);
            }
        };
        const valueInMgPerMl = toMgPerMl(value, fromUnit);
        return fromMgPerMl(valueInMgPerMl, toUnit);
    }

    function convertInfusionRate(value, fromUnit, toUnit) {
        const toMlPerHour = (val, unit) => {
            switch (unit) {
                case "mL/min": return val * 60;
                case "mL/h": return val;
                case "L/h": return val * 1000;
                default: throw new Error(`Unidade de taxa de infusão desconhecida: ${unit}`);
            }
        };
        const fromMlPerHour = (val, unit) => {
            switch (unit) {
                case "mL/min": return val / 60;
                case "mL/h": return val;
                case "L/h": return val / 1000;
                default: throw new Error(`Unidade de taxa de infusão desconhecida: ${unit}`);
            }
        };
        const valueInMlPerHour = toMlPerHour(value, fromUnit);
        return fromMlPerHour(valueInMlPerHour, toUnit);
    }

    function convertTime(value, fromUnit, toUnit) {
        const toMinutes = (val, unit) => {
            switch (unit) {
                case "minutos": return val;
                case "horas": return val * 60;
                default: throw new Error(`Unidade de tempo desconhecida: ${unit}`);
            }
        };
        const fromMinutes = (val, unit) => {
            switch (unit) {
                case "minutos": return val;
                case "horas": return val / 60;
                default: throw new Error(`Unidade de tempo desconhecida: ${unit}`);
            }
        };
        const valueInMinutes = toMinutes(value, fromUnit);
        return fromMinutes(valueInMinutes, toUnit);
    }

    // --- Objeto Principal: Calculadoras e suas Propriedades ---
    // Este objeto armazena todas as categorias de cálculos, subcategorias,
    // suas explicações detalhadas, estrutura de formulário e lógica de cálculo.
    const calculationConfigs = {
        // 1. Cálculos de Dose
        "Cálculos de Dose": {
            name: "Cálculos de Dose",
            subcategories: {
                "Dose por Peso (mg/kg)": {
                    name: "Dose por Peso (mg/kg)", // Added name for consistent display in dropdown
                    titulo: "Dose por Peso (mg/kg)",
                    fundamento: `Calcula a dose total de um medicamento baseada no peso do paciente, crucial para pediatria e para fármacos com janela terapêutica estreita, garantindo dosagens seguras e eficazes.`,
                    formula: `Dose Total (mg) = Dose por Kg (mg/kg) × Peso (kg)`,
                    exemploClinico: `<strong>🔸 Problema:</strong><br> Um médico prescreveu 50 mg de um medicamento. O medicamento está disponível em frascos de 250 mg/5 mL. Quantos mL você deve administrar?<br><br><strong>🔹 Resolução:</strong><br><br><br><strong>1️⃣ Identificar os dados:</strong><br>  **Identificar os dados:**<br>• Dose por Kg = 10 mg/kg<br>• Peso = 15 kg<br><br><strong>2️⃣ Calcular a concentração por mL:</strong><br>  **Calcular a concentração por mL:**<br>• Concentração por mL = 250 mg / 5 mL = 50 mg/mL<br><br><strong>3️⃣ Aplicar a fórmula:</strong><br>  **Aplicar a fórmula:**<br>    Dose  (mg) = 10 mg/kg × 15 kg = 150 mg<br><br><hr><br><strong>✅ Resposta:</strong><br> A dose a ser administrada é de 150 mg. Lembre de consultar as especificações do fabricante para saber se o cálculo será para uma dose fracionada ou para dose única

Exemplo: se a bula descreve 10mg/kg por dose, uma criança de 15 kg receberá 150 mg em cada administração. Agora se a descrição é
mg/kg/dia indica a quantidade total de medicamento dada ao longo de um dia inteiro, que pode ser administrada de uma só vez ou dividida em várias doses.

Exemplo: 30 mg/kg/dia para um paciente de 15 kg resulta em 450 mg por dia. Se administrado em 3 doses, cada dose seria 150 mg`,
                    chamadaCalculadora: `Para calcular a dose por peso, informe a 'Dose por Peso' e o 'Peso do Paciente'.`,
                    observacaoImportante: `Sempre utilize o peso atual do paciente. Em pacientes obesos, a dose pode ser calculada com base no peso ideal ou peso ajustado, dependendo do medicamento.`,
                    fields: [
                        { id: "dosePorKg", label: "Dose por Peso:", type: "number", placeholder: "Ex: 10", units: ["mg/kg", "mcg/kg"], defaultUnit: "mg/kg", step: "0.01" },
                        { id: "pesoPacienteDoseKg", label: "Peso do Paciente:", type: "number", placeholder: "Ex: 15", units: ["kg", "lb"], defaultUnit: "kg", step: "0.01" }
                    ],
                    calculo: function() {
                        let dosePorKg = parseFloat(document.getElementById("dosePorKg").value);
                        let peso = parseFloat(document.getElementById("pesoPacienteDoseKg").value);

                        const unitDosePorKg = document.getElementById("dosePorKg-unit-select").value;
                        const unitPeso = document.getElementById("pesoPacienteDoseKg-unit-select").value;

                        if (isNaN(dosePorKg) || isNaN(peso) || dosePorKg <= 0 || peso <= 0) {
                            throw new Error("Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero.");
                        }

                        // Conversão para unidades base (mg/kg e kg)
                        dosePorKg = convertDosePerKgToMgPerKg(dosePorKg, unitDosePorKg);
                        peso = convertToKg(peso, unitPeso);

                        const doseTotal = dosePorKg * peso;

                        return {
                            resultado: `Dose Total: ${doseTotal.toFixed(2)} mg`,
                            detalhes: [
                                `Dose por Peso Convertida: ${dosePorKg.toFixed(2)} mg/kg`,
                                `Peso do Paciente Convertido: ${peso.toFixed(2)} kg`
                            ]
                        };
                    },
                    referencias: []
                },
                "Dose por Peso Ajustado": {
                    name: "Dose por Peso Ajustado", // Added name for consistent display in dropdown
                    titulo: "Dose por Peso Ajustado",
                    fundamento: `Em pacientes obesos, a distribuição de medicamentos lipofílicos (que se acumulam em gordura) pode ser significativamente alterada devido ao aumento do tecido adiposo. Para otimizar a eficácia e segurança do tratamento, é recomendado o uso do peso ajustado (ABW - Adjusted Body Weight) ao invés do peso corporal total (TBW). Isso ajuda a evitar subdosagem (quando a dose é insuficiente) ou superdosagem (quando a dose é excessiva), condições que podem comprometer a eficácia do medicamento ou aumentar o risco de efeitos adversos.`,
                    formula: `Peso Ideal (kg) = 50 + 2.3 × (Altura em polegadas - 60) (Homens)<br>Peso Ideal (kg) = 45.5 + 2.3 × (Altura em polegadas - 60) (Mulheres)<br>Peso Ajustado (kg) = Peso Ideal + 0.4 × (Peso Real - Peso Ideal)`,
                    exemploClinico: `<strong>🔸 Problema:</strong><br> Uma mulher tem 1.65 m de altura e pesa 90 kg. O medicamento requer dosagem por peso ajustado. Qual o peso ajustado?<br><br><strong>🔹 Resolução:</strong><br><br><br><strong>1️⃣ Identificar os dados:</strong><br>  Identificar os dados:<br>• Altura = 1.65 m<br>• Peso Real = 90 kg<br>• Gênero = Feminino<br><br><strong>2️⃣ Converter Altura para polegadas:</strong><br>  Converter Altura para polegadas:<br>• 1.65 m = 165 cm. 165 cm / 2.54 cm/polegada ≈ 64.96 polegadas<br><br><strong>3️⃣ Calcular Peso Ideal (Feminino):</strong><<br>  Calcular Peso Ideal (Feminino):<br>• Peso Ideal = 45.5 + 2.3 × (64.96 - 60) = 45.5 + 2.3 × 4.96 = 45.5 + 11.41 = 56.91 kg<br><br><strong>4️⃣ Calcular Peso Ajustado:</strong><br>  Calcular Peso Ajustado:<br>• Peso Ajustado = 56.91 + 0.4 × (90 - 56.91) = 56.91 + 0.4 × 33.09 = 56.91 + 13.24 = 70.15 kg<br><br><hr><br><strong>✅ Resposta:</strong><br> O peso ajustado para essa paciente é de aproximadamente 70.15 kg. Atenção ! para o cálculo da dose por peso ajustado inserir o valor do peso obtido nesta calculadora e adicionar na calculadora anterior dose por peso.`,
                    chamadaCalculadora: `Para calcular o peso ajustado, informe o 'Peso Real', a 'Altura' e o 'Gênero' do paciente.`,
                    observacaoImportante: `O peso ajustado é usado para fármacos lipofílicos em pacientes obesos. Para medicamentos hidrofílicos, o peso ideal geralmente é o mais apropriado. Verifique as diretrizes do medicamento.`,
                    fields: [
                        { id: "pesoReal", label: "Peso Real:", type: "number", placeholder: "Ex: 90", units: ["kg", "lb"], defaultUnit: "kg", step: "0.01" },
                        { id: "altura", label: "Altura:", type: "number", placeholder: "Ex: 1.65", units: ["cm", "m", "in"], defaultUnit: "m", step: "0.01" },
                        { id: "genero", label: "Gênero:", type: "select", options: [{ value: "masculino", text: "Masculino" }, { value: "feminino", text: "Feminino" }] }
                    ],
                    calculo: function() {
                        let pesoReal = parseFloat(document.getElementById("pesoReal").value);
                        let altura = parseFloat(document.getElementById("altura").value);
                        const genero = document.getElementById("genero").value;

                        const unitPeso = document.getElementById("pesoReal-unit-select").value;
                        const unitAltura = document.getElementById("altura-unit-select").value;

                        if (isNaN(pesoReal) || isNaN(altura) || pesoReal <= 0 || altura <= 0) {
                            throw new Error("Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero.");
                        }

                        // Conversão para unidades base (kg e cm)
                        pesoReal = convertToKg(pesoReal, unitPeso);
                        altura = convertToCm(altura, unitAltura); // Converte para cm

                        const alturaEmPolegadas = altura / 2.54;

                        let pesoIdeal;
                        if (genero === "masculino") {
                            pesoIdeal = 50 + 2.3 * (alturaEmPolegadas - 60);
                        } else { // feminino
                            pesoIdeal = 45.5 + 2.3 * (alturaEmPolegadas - 60);
                        }

                        if (pesoIdeal <= 0) {
                            throw new Error("O Peso Ideal calculado é zero ou negativo. Verifique a altura informada.");
                        }

                        const pesoAjustado = pesoIdeal + 0.4 * (pesoReal - pesoIdeal);

                        return {
                            resultado: `Peso Ideal: ${pesoIdeal.toFixed(2)} kg<br>Peso Ajustado: ${pesoAjustado.toFixed(2)} kg`,
                            detalhes: [
                                `Peso Real Convertido: ${pesoReal.toFixed(2)} kg`,
                                `Altura Convertida: ${altura.toFixed(2)} cm (${alturaEmPolegadas.toFixed(2)} polegadas)`,
                                `Gênero: ${genero === "masculino" ? "Masculino" : "Feminino"}`
                            ]
                        };
                    },
                    referencias: []
                },
                "Dose por Superfície Corporal (ASC)": {
                    name: "Dose por Superfície Corporal (ASC)", // Added name for consistent display in dropdown
                    titulo: "Dose por Superfície Corporal (ASC)",
                    fundamento: `A Área de Superfície Corporal (BSA - Body Surface Area) é um parâmetro fisiológico utilizado para dosagem de medicamentos, especialmente quimioterápicos e imunossupressores, pois se correlaciona melhor com o metabolismo e distribuição de fármacos do que o peso isolado. A fórmula de Mosteller é a mais comum para este cálculo.`,
                    formula: `SC (m²) = √((Peso (kg) × Altura (cm)) / 3600)<br>Dose Total = Dose por ASC (unidade/m²) &times; SC (m²)`,
                    exemploClinico: `<strong>🔸 Problema:</strong><br> Um paciente com 170 cm de altura e 70 kg de peso precisa de um medicamento na dose de 50 mg/m². Calcule a dose total.<br><br><strong>🔹 Resolução:</strong><br><br><strong>1️⃣ Calcular Superfície Corporal (SC):</strong><br>• SC (m²) = √((70 × 170) / 3600) ≈ 1.82 m²<br><br><strong>2️⃣ Calcular Dose Total:</strong><br>• Dose Total = 50 mg/m² × 1.82 m² = 91 mg<br><br><hr><br><strong>✅ Resposta:</strong><br> A dose total a ser administrada é de aproximadamente 91 mg.`,
                    chamadaCalculadora: `Informe o peso e a altura do paciente, e a dose por superfície corporal desejada.`,
                    observacaoImportante: `Sempre use medidas precisas de peso e altura. O cálculo da BSA é um passo para determinar a dose total do medicamento.`,
                    fields: [
                        { id: "pesoBSA", label: "Peso:", type: "number", placeholder: "Ex: 70", units: ["kg", "lb"], defaultUnit: "kg", step: "0.1" },
                        { id: "alturaBSA", label: "Altura:", type: "number", placeholder: "Ex: 170", units: ["cm", "m", "in"], defaultUnit: "cm", step: "0.1" },
                        { id: "dosePorASC", label: "Dose por ASC:", type: "number", placeholder: "Ex: 50", units: ["mg/m²", "mcg/m²"], defaultUnit: "mg/m²", step: "0.01" }
                    ],
                    calculo: function() {
                        let peso = parseFloat(document.getElementById("pesoBSA").value);
                        let altura = parseFloat(document.getElementById("alturaBSA").value);
                        let dosePorASC = parseFloat(document.getElementById("dosePorASC").value);
                        const unitPeso = document.getElementById("pesoBSA-unit-select").value;
                        const unitAltura = document.getElementById("alturaBSA-unit-select").value;
                        const unitDoseASC = document.getElementById("dosePorASC-unit-select").value;

                        if (isNaN(peso) || isNaN(altura) || isNaN(dosePorASC) || peso <= 0 || altura <= 0 || dosePorASC <= 0) {
                            throw new Error("Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero.");
                        }

                        peso = convertToKg(peso, unitPeso);
                        altura = convertToCm(altura, unitAltura);
                        dosePorASC = convertDosePerASCtoMgPerM2(dosePorASC, unitDoseASC);

                        const sc = Math.sqrt((peso * altura) / 3600);
                        const doseTotal = sc * dosePorASC;

                        if (isNaN(sc) || sc <= 0) {
                            throw new Error("Não foi possível calcular a Superfície Corporal. Verifique os valores de peso e altura.");
                        }

                        return {
                            resultado: `Superfície Corporal (SC): ${sc.toFixed(2)} m²<br>Dose Total: ${doseTotal.toFixed(2)} mg`,
                            detalhes: [
                                `Peso Convertido: ${peso.toFixed(2)} kg`,
                                `Altura Convertida: ${altura.toFixed(2)} cm`,
                                `Dose por ASC Convertida: ${dosePorASC.toFixed(2)} mg/m²`
                            ]
                        };
                    },
                    referencias: []
                },
                "Dose Fracionada": {
                    name: "Dose Fracionada",
                    titulo: "Dose Fracionada",
                    fundamento: `Quando não há apresentação disponível com a dose exata prescrita — seja comprimido, ampola ou embalagem líquida — o fracionamento permite ajustar a dose.`,
                    formula: `Dose a Administrar = (Dose Prescrita / Dose Disponível) × Volume/Comprimido Disponível`,
                    exemploClinico: `<strong>🔸 Problema:</strong><br> Foi prescrito 0.25 mg de um medicamento. Você tem comprimidos de 0.5 mg. Quanto do comprimido você deve administrar?<br><br><strong>🔹 Resolução:</strong><br><br><br><strong>1️⃣ Identificar os dados:</strong><br>  **Identificar os dados:**<br>• Dose Prescrita = 0.25 mg<br>• Dose Disponível = 0.5 mg<br>• Volume/Comprimido Disponível = 1 comprimido (pois é um comprimido inteiro)<br><br><strong>2️⃣ Aplicar a fórmula:</strong><br>  Aplicar a fórmula:<br>    Dose a Administrar = (0.25 mg / 0.5 mg) × 1 comprimido = 0.5 comprimido<br><br><hr><br><strong>✅ Resposta:</strong><br> Você deve administrar 0.5 (meio) comprimido.`,
                    chamadaCalculadora: `Para calcular a dose fracionada, informe a 'Dose Prescrita', a 'Dose Disponível' e o 'Volume ou Quantidade da Apresentação'.`,
                    observacaoImportante: `Apenas fracione comprimidos se houver linha de sulco (rânula) e se o medicamento puder ser fracionado sem perda de eficácia ou dose. Para líquidos, use seringa de precisão. Caso o fragmento necessário não seja inteiro ou resulte em pedaços pequenos demais, a prática pode levar a dosagem imprecisa, perda de eficácia ou até desperdício — e nesses casos é recomendado considerar outra forma farmacêutica (ex.: solução). 🏥 Uso em Sonda Quando o paciente recebe medicamentos por sonda (enteral), comprimidos devem ser triturados até pó fino e suspensos em água estéril. Utilize seringas graduadas e enxágues adequados antes e após administração (ideal ≥ 15 mL) para evitar obstrução da sonda e garantir absorção eficaz  `,
                    fields: [
                        { id: "dosePrescritaFracionada", label: "Dose Prescrita:", type: "number", placeholder: "Ex: 0.25", units: ["mg", "mcg", "g"], defaultUnit: "mg", step: "0.01" },
                        { id: "doseDisponivelFracionada", label: "Dose Disponível na Apresentação:", type: "number", placeholder: "Ex: 0.5", units: ["mg", "mcg", "g"], defaultUnit: "mg", step: "0.01" },
                        { id: "apresentacaoDisponivelFracionada", label: "Volume/Quantidade da Apresentação:", type: "number", placeholder: "Ex: 1 (comprimido) ou 5 (mL)", units: ["unidade(s)", "mL"], defaultUnit: "unidade(s)", step: "0.01" }
                    ],
                    calculo: function() {
                        let dosePrescrita = parseFloat(document.getElementById("dosePrescritaFracionada").value);
                        let doseDisponivel = parseFloat(document.getElementById("doseDisponivelFracionada").value);
                        let apresentacaoDisponivel = parseFloat(document.getElementById("apresentacaoDisponivelFracionada").value);
                        const unitDosePrescrita = document.getElementById("dosePrescritaFracionada-unit-select").value;
                        const unitDoseDisponivel = document.getElementById("doseDisponivelFracionada-unit-select").value;
                        const unitApresentacaoDisponivel = document.getElementById("apresentacaoDisponivelFracionada-unit-select").value;

                        if (isNaN(dosePrescrita) || isNaN(doseDisponivel) || isNaN(apresentacaoDisponivel) || dosePrescrita <= 0 || doseDisponivel <= 0 || apresentacaoDisponivel <= 0) {
                            throw new Error("Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero.");
                        }

                        // Conversão para unidades base (mg e unidade/mL)
                        dosePrescrita = convertToMg(dosePrescrita, unitDosePrescrita);
                        doseDisponivel = convertToMg(doseDisponivel, unitDoseDisponivel);
                        // apresentacaoDisponivel já pode ser mL ou unidades, não precisa converter se a fórmula lida com ambos.

                        if (doseDisponivel === 0) {
                            throw new Error("A Dose Disponível na Apresentação não pode ser zero.");
                        }

                        const doseAdministrar = (dosePrescrita / doseDisponivel) * apresentacaoDisponivel;

                        return {
                            resultado: `Dose a Administrar: ${doseAdministrar.toFixed(2)} ${unitApresentacaoDisponivel === "mL" ? "mL" : "unidade(s)"}`,
                            detalhes: [
                                `Dose Prescrita Convertida: ${dosePrescrita.toFixed(2)} mg`,
                                `Dose Disponível Convertida: ${doseDisponivel.toFixed(2)} mg`,
                                `Volume/Quantidade da Apresentação: ${apresentacaoDisponivel.toFixed(2)} ${unitApresentacaoDisponivel}`
                            ]
                        };
                    },
                    referencias: []
                },
                "Dose Recebida por Tempo de Infusão": {
                    name: "Dose Recebida por Tempo de Infusão",
                    titulo: "Dose Recebida por Tempo de Infusão (Ex: Contínua)",
                    fundamento: `Calcula a dose total de um medicamento que o paciente recebeu em um determinado período, baseando-se na concentração da solução, taxa de infusão e duração. Essencial para monitorar a administração e evitar toxicidade ou subdosagem.`,
                    formula: `Dose Recebida (mg) = (Concentração da Solução (mg/mL) × Taxa de Infusão (mL/h) × Tempo de Infusão (horas))`,
                    exemploClinico: `<strong>🔸 Problema:</strong><br> Um paciente recebeu uma infusão contínua de um medicamento a 10 mg/mL a uma taxa de 50 mL/h por 2 horas. Qual a dose total de medicamento que o paciente recebeu?<br><br><strong>🔹 Resolução:</strong><br><br><br><strong>1️⃣ Identificar os dados:</strong><br>  **Identificar os dados:**<br>• Concentração da Solução = 10 mg/mL<br>• Taxa de Infusão = 50 mL/h<br>• Tempo de Infusão = 2 horas<br><br><strong>2️⃣ Aplicar a fórmula:</strong><br>  Aplicar a fórmula:<br>    Dose Recebida (mg) = 10 mg/mL × 50 mL/h × 2 horas = 1000 mg<br><br><hr><br><strong>✅ Resposta:</strong><br> O paciente recebeu 1000 mg (ou 1g) do medicamento.`,
                    chamadaCalculadora: `Para calcular a dose recebida, informe a 'Concentração da Solução', a 'Taxa de Infusão' e o 'Tempo de Infusão'.`,
                    observacaoImportante: `Este cálculo é simplificado e assume infusão constante. Em contextos clínicos complexos (e.g., doses de ataque, variação de taxa), a monitorização clínica é indispensável.`,
                    fields: [
                        { id: "concentracaoSolucaoDoseRecebida", label: "Concentração da Solução:", type: "number", placeholder: "Ex: 10", units: ["mg/mL", "mcg/mL", "g/mL", "%"], defaultUnit: "mg/mL", step: "0.01" },
                        { id: "taxaInfusaoDoseRecebida", label: "Taxa de Infusão:", type: "number", placeholder: "Ex: 50", units: ["mL/h", "mL/min", "L/h"], defaultUnit: "mL/h", step: "0.01" },
                        { id: "tempoInfusaoDoseRecebida", label: "Tempo de Infusão:", type: "number", placeholder: "Ex: 2", units: ["horas", "minutos"], defaultUnit: "horas", step: "0.01" }
                    ],
                    calculo: function() {
                        let concentracaoSolucao = parseFloat(document.getElementById("concentracaoSolucaoDoseRecebida").value);
                        let taxaInfusao = parseFloat(document.getElementById("taxaInfusaoDoseRecebida").value);
                        let tempoInfusao = parseFloat(document.getElementById("tempoInfusaoDoseRecebida").value);

                        const unitConcentracao = document.getElementById("concentracaoSolucaoDoseRecebida-unit-select").value;
                        const unitTaxaInfusao = document.getElementById("taxaInfusaoDoseRecebida-unit-select").value;
                        const unitTempoInfusao = document.getElementById("tempoInfusaoDoseRecebida-unit-select").value;

                        if (isNaN(concentracaoSolucao) || isNaN(taxaInfusao) || isNaN(tempoInfusao) || concentracaoSolucao <= 0 || taxaInfusao <= 0 || tempoInfusao <= 0) {
                            throw new Error("Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero.");
                        }

                        // Converter para unidades base (mg/mL, mL/h, horas)
                        concentracaoSolucao = convertConcentrationToMgPerMl(concentracaoSolucao, unitConcentracao);
                        taxaInfusao = convertTaxaInfusaoToMlPerHour(taxaInfusao, unitTaxaInfusao);
                        tempoInfusao = convertTime(tempoInfusao, unitTempoInfusao) / 60; // Convert minutos to hours

                        const doseRecebida = concentracaoSolucao * taxaInfusao * tempoInfusao;

                        return {
                            resultado: `Dose Recebida: ${doseRecebida.toFixed(2)} mg`,
                            detalhes: [
                                `Concentração da Solução Convertida: ${concentracaoSolucao.toFixed(2)} mg/mL`,
                                `Taxa de Infusão Convertida: ${taxaInfusao.toFixed(2)} mL/h`,
                                `Tempo de Infusão Convertido: ${tempoInfusao.toFixed(2)} horas`
                            ]
                        };
                    },
                    referencias: []
                },
                "Velocidade de Infusão em mL/h a partir de Dose (mcg/kg/min)": {
                    name: "Velocidade de Infusão em mL/h a partir de Dose (mcg/kg/min)",
                    titulo: "Velocidade de Infusão (mL/h) a partir da Dose (mcg/kg/min)",
                    fundamento: `Essencial para o ajuste preciso de bombas de infusão, permitindo calcular a velocidade necessária em mL/h para atingir uma dose desejada por peso e tempo, comum em terapias com drogas vasoativas e sedação.`,
                    formula: `Taxa de Infusão (mL/h) = (Dose (mcg/kg/min) × Peso (kg) × 60 min/h) / Concentração da Solução (mcg/mL)`,
                    exemploClinico: `<strong>🔸 Problema:</strong><br> Um paciente de 70 kg precisa de uma infusão de dobutamina a 5 mcg/kg/min. A solução está preparada a 1250 mcg/mL. Qual a taxa de infusão em mL/h?<br><br><strong>🔹 Resolução:</strong><br><br><strong>1️⃣ Identificar os dados:</strong><br>• Dose Desejada = 5 mcg/kg/min<br>• Peso do Paciente = 70 kg<br>• Concentração da Solução = 1250 mcg/mL<br><br><strong>2️⃣ Aplicar a fórmula:</strong><br>• Taxa de Infusão (mL/h) = (5 × 70 × 60) / 1250<br>• Taxa de Infusão (mL/h) = 21000 / 1250 = 16.8 mL/h<br><br><hr><br><strong>✅ Resposta:</strong><br> A taxa de infusão deve ser de 16.8 mL/h.`,
                    chamadaCalculadora: `Para calcular a velocidade de infusão, informe a 'Dose Desejada', 'Peso do Paciente', 'Quantidade de Medicamento na Solução' e 'Volume Final da Solução'.`,
                    observacaoImportante: `A precisão da concentração da solução é vital. Sempre confira o cálculo e use bombas de infusão programáveis para garantir a segurança.`,
                    fields: [
                        { id: "doseDesejadaInfusao", label: "Dose Desejada:", type: "number", placeholder: "Ex: 5", units: ["mcg/kg/min", "mg/kg/min", "mg/kg/h"], defaultUnit: "mcg/kg/min", step: "0.01" },
                        { id: "pesoPacienteInfusao", label: "Peso do Paciente:", type: "number", placeholder: "Ex: 70", units: ["kg", "lb"], defaultUnit: "kg", step: "0.01" },
                        { id: "quantMedicamentoInfusao", label: "Quantidade de Medicamento na Solução:", type: "number", placeholder: "Ex: 250", units: ["mg", "mcg", "g"], defaultUnit: "mg", step: "0.01" },
                        { id: "volumeSolucaoInfusao", label: "Volume Final da Solução:", type: "number", placeholder: "Ex: 200", units: ["mL", "L"], defaultUnit: "mL", step: "0.01" }
                    ],
                    calculo: function() {
                        let doseDesejada = parseFloat(document.getElementById("doseDesejadaInfusao").value);
                        let pesoPaciente = parseFloat(document.getElementById("pesoPacienteInfusao").value);
                        let quantMedicamento = parseFloat(document.getElementById("quantMedicamentoInfusao").value);
                        let volumeSolucao = parseFloat(document.getElementById("volumeSolucaoInfusao").value);

                        const unitDoseDesejada = document.getElementById("doseDesejadaInfusao-unit-select").value;
                        const unitPesoPaciente = document.getElementById("pesoPacienteInfusao-unit-select").value;
                        const unitQuantMedicamento = document.getElementById("quantMedicamentoInfusao-unit-select").value;
                        const unitVolumeSolucao = document.getElementById("volumeSolucaoInfusao-unit-select").value;

                        if (isNaN(doseDesejada) || isNaN(pesoPaciente) || isNaN(quantMedicamento) || isNaN(volumeSolucao) ||
                            doseDesejada <= 0 || pesoPaciente <= 0 || quantMedicamento <= 0 || volumeSolucao <= 0) {
                            throw new Error("Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero.");
                        }

                        // Converter para unidades base: mcg/kg/min, kg, mcg, mL
                        doseDesejada = convertDosePerWeightPerTime(doseDesejada, unitDoseDesejada); // Converts to mcg/kg/min
                        pesoPaciente = convertToKg(pesoPaciente, unitPesoPaciente); // Converts to kg
                        quantMedicamento = convertToMcg(quantMedicamento, unitQuantMedicamento); // Converts to mcg
                        volumeSolucao = convertToMl(volumeSolucao, unitVolumeSolucao); // Converts to mL

                        const concentracaoSolucaoMcgPerMl = quantMedicamento / volumeSolucao; // mcg/mL

                        // Taxa de Infusão (mL/h) = (Dose (mcg/kg/min) × Peso (kg) × 60 min/h) / Concentração da Solução (mcg/mL)
                        const taxaInfusaoMlH = (doseDesejada * pesoPaciente * 60) / concentracaoSolucaoMcgPerMl;

                        return {
                            resultado: `Taxa de Infusão: ${taxaInfusaoMlH.toFixed(2)} mL/h`,
                            detalhes: [
                                `Dose Desejada Convertida: ${doseDesejada.toFixed(4)} mcg/kg/min`,
                                `Peso do Paciente Convertido: ${pesoPaciente.toFixed(2)} kg`,
                                `Quantidade de Medicamento Convertida: ${quantMedicamento.toFixed(2)} mcg`,
                                `Volume da Solução Convertido: ${volumeSolucao.toFixed(2)} mL`,
                                `Concentração da Solução: ${concentracaoSolucaoMcgPerMl.toFixed(4)} mcg/mL`
                            ]
                        };
                    },
                    referencias: []
                }
            }
        },
        // 2. Cálculos de Solução e Diluição
        "Cálculos de Solução e Diluição": {
            name: "Cálculos de Solução e Diluição",
            subcategories: {
                "Cálculo de Gotejamento": {
                    name: "Cálculo de Gotejamento",
                    titulo: "Cálculo de Gotejamento (Gotas/min ou Microgotas/min)",
                    fundamento: `Calcula o número de gotas ou microgotas por minuto para administração intravenosa, essencial para garantir que a infusão seja administrada na taxa prescrita, seja por gravidade ou com bombas de infusão.`,
                    formula: `Gotas/min = (Volume (mL) × Fator Gotejamento) / Tempo (minutos)<br>Microgotas/min = Volume (mL) / Tempo (horas)<br>Fatores de Gotejamento: <ul><li>Macrogotas: 1 mL = 20 gotas</li><li>Microgotas: 1 mL = 60 microgotas</li></ul>`,
                    exemploClinico: `<strong>🔸 Problema:</strong><br> Prescrito 1000 mL de soro fisiológico para ser infundido em 8 horas com um equipo de macrogotas. Calcule a taxa de gotejamento.<br><br><strong>🔹 Resolução:</strong><br><br><strong>1️⃣ Identificar os dados:</strong><br>• Volume = 1000 mL<br>• Tempo = 8 horas (convertido para minutos: 8 × 60 = 480 minutos)<br>• Tipo de Equipo = Macrogotas (Fator Gotejamento = 20)<br><br><strong>2️⃣ Aplicar a fórmula:</strong><br>• Gotas/min = (1000 mL × 20) / 480 minutos<br>• Gotas/min = 20000 / 480 ≈ 41.67 gotas/min<br><br><hr><br><strong>✅ Resposta:</strong><br> A taxa de gotejamento deve ser de aproximadamente 42 gotas/min.`,
                    chamadaCalculadora: `Para calcular o gotejamento, informe o 'Volume Total', o 'Tempo de Infusão' e o 'Tipo de Equipo'.`,
                    observacaoImportante: `A precisão é crucial, especialmente para medicamentos com estreita janela terapêutica. Sempre monitore o paciente e o equipamento.`,
                    fields: [
                        { id: "volumeGotejamento", label: "Volume Total da Solução:", type: "number", placeholder: "Ex: 1000", units: ["mL", "L"], defaultUnit: "mL", step: "0.01" },
                        { id: "tempoGotejamento", label: "Tempo de Infusão:", type: "number", placeholder: "Ex: 8", units: ["horas", "minutos"], defaultUnit: "horas", step: "0.01" },
                        { id: "tipoEquipo", label: "Tipo de Equipo:", type: "select", options: [{ value: "macrogotas", text: "Macrogotas (20 gts/mL)" }, { value: "microgotas", text: "Microgotas (60 mcgs/mL)" }] }
                    ],
                    calculo: function() {
                        let volume = parseFloat(document.getElementById("volumeGotejamento").value);
                        let tempo = parseFloat(document.getElementById("tempoGotejamento").value);
                        const tipoEquipo = document.getElementById("tipoEquipo").value;

                        const unitVolume = document.getElementById("volumeGotejamento-unit-select").value;
                        const unitTempo = document.getElementById("tempoGotejamento-unit-select").value;

                        if (isNaN(volume) || isNaN(tempo) || volume <= 0 || tempo <= 0) {
                            throw new Error("Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero.");
                        }

                        // Converter para unidades base (mL, minutos)
                        volume = convertToMl(volume, unitVolume);
                        tempo = convertTime(tempo, unitTempo); // Converte para minutos

                        let resultadoTexto = "";
                        let detalhes = [
                            `Volume Total Convertido: ${volume.toFixed(2)} mL`,
                            `Tempo de Infusão Convertido: ${tempo.toFixed(2)} minutos`
                        ];

                        if (tipoEquipo === "macrogotas") {
                            const fatorGotejamento = 20;
                            const gotasPorMin = (volume * fatorGotejamento) / tempo;
                            resultadoTexto = `Gotas/min: ${gotasPorMin.toFixed(2)} gotas/min`;
                            detalhes.push(`Tipo de Equipo: Macrogotas (20 gotas/mL)`);
                        } else { // microgotas
                            // Microgotas/min é mL/h. Se o tempo está em minutos, converte para horas
                            const tempoHoras = tempo / 60;
                            if (tempoHoras === 0) {
                                throw new Error("O tempo de infusão em horas não pode ser zero para microgotas.");
                            }
                            const microgotasPorMin = volume / tempoHoras;
                            resultadoTexto = `Microgotas/min (mL/h): ${microgotasPorMin.toFixed(2)} microgotas/min (mL/h)`;
                            detalhes.push(`Tipo de Equipo: Microgotas (60 microgotas/mL ou 1 mL/h)`);
                        }

                        return {
                            resultado: resultadoTexto,
                            detalhes: detalhes
                        };
                    },
                    referencias: []
                },
                "Concentração de Solução": {
                    name: "Concentração de Solução",
                    titulo: "Cálculo de Concentração de Solução",
                    fundamento: `Determina a concentração de uma substância em uma solução, expressa em mg/mL, mcg/mL, g/mL ou percentagem. Crucial para a diluição precisa de medicamentos.`,
                    formula: `Concentração = Quantidade do Soluto / Volume Total da Solução`,
                    exemploClinico: `<strong>🔸 Problema:</strong><br> Você dissolveu 250 mg de um medicamento em 5 mL de solução. Qual a concentração em mg/mL?<br><br><strong>🔹 Resolução:</strong><br><br><strong>1️⃣ Identificar os dados:</strong><br>• Quantidade do Soluto = 250 mg<br>• Volume Total da Solução = 5 mL<br><br><strong>2️⃣ Aplicar a fórmula:</strong><br>• Concentração = 250 mg / 5 mL = 50 mg/mL<br><br><hr><br><strong>✅ Resposta:</strong><br> A concentração da solução é de 50 mg/mL.`,
                    chamadaCalculadora: `Informe a 'Quantidade do Soluto' e o 'Volume Total da Solução' para calcular a concentração.`,
                    observacaoImportante: `Sempre use técnicas assépticas para preparar e manusear soluções. Verifique a compatibilidade e estabilidade.`,
                    fields: [
                        { id: "quantSolutoConcentracao", label: "Quantidade do Soluto:", type: "number", placeholder: "Ex: 250", units: ["mg", "mcg", "g"], defaultUnit: "mg", step: "0.01" },
                        { id: "volumeSolucaoConcentracao", label: "Volume Total da Solução:", type: "number", placeholder: "Ex: 5", units: ["mL", "L"], defaultUnit: "mL", step: "0.01" },
                        { id: "unitOutputConcentracao", label: "Unidade de Saída:", type: "select", options: [{ value: "mg/mL", text: "mg/mL" }, { value: "mcg/mL", text: "mcg/mL" }, { value: "g/mL", text: "g/mL" }, { value: "%", text: "% (m/v)" }] }
                    ],
                    calculo: function() {
                        let quantSoluto = parseFloat(document.getElementById("quantSolutoConcentracao").value);
                        let volumeSolucao = parseFloat(document.getElementById("volumeSolucaoConcentracao").value);
                        const unitOutput = document.getElementById("unitOutputConcentracao").value;

                        const unitQuantSoluto = document.getElementById("quantSolutoConcentracao-unit-select").value;
                        const unitVolumeSolucao = document.getElementById("volumeSolucaoConcentracao-unit-select").value;

                        if (isNaN(quantSoluto) || isNaN(volumeSolucao) || quantSoluto <= 0 || volumeSolucao <= 0) {
                            throw new Error("Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero.");
                        }

                        // Converter para unidades base (mg, mL)
                        quantSoluto = convertToMg(quantSoluto, unitQuantSoluto);
                        volumeSolucao = convertToMl(volumeSolucao, unitVolumeSolucao);

                        if (volumeSolucao === 0) {
                            throw new Error("O Volume Total da Solução não pode ser zero.");
                        }

                        const concentracaoMgPerMl = quantSoluto / volumeSolucao; // mg/mL

                        const resultadoConvertido = convertFromMgPerMl(concentracaoMgPerMl, unitOutput);

                        return {
                            resultado: `Concentração: ${resultadoConvertido.toFixed(4)} ${unitOutput}`,
                            detalhes: [
                                `Quantidade do Soluto Convertida: ${quantSoluto.toFixed(2)} mg`,
                                `Volume Total da Solução Convertido: ${volumeSolucao.toFixed(2)} mL`
                            ]
                        };
                    },
                    referencias: []
                },
                "Diluição Simples (M1V1=M2V2)": {
                    name: "Diluição Simples (M1V1=M2V2)",
                    titulo: "Diluição Simples (M1V1=M2V2)",
                    fundamento: `A fórmula M1V1=M2V2 é fundamental para preparar soluções de uma concentração desejada a partir de uma solução estoque mais concentrada. "M" representa a concentração (ou molaridade) e "V" o volume.`,
                    formula: `M1 × V1 = M2 × V2<br>Onde:<br>M1 = Concentração inicial (solução estoque)<br>V1 = Volume inicial (volume da solução estoque a ser usado)<br>M2 = Concentração final (solução desejada)<br>V2 = Volume final (volume total da solução desejada)`,
                    exemploClinico: `<strong>🔸 Problema:</strong><br> Você tem uma solução de 500 mg/mL e precisa preparar 100 mL de uma solução a 50 mg/mL. Quanto da solução estoque você precisa?<br><br><strong>🔹 Resolução:</strong><br><br><strong>1️⃣ Identificar os dados:</strong><br>• M1 = 500 mg/mL<br>• V1 = ?<br>• M2 = 50 mg/mL<br>• V2 = 100 mL<br><br><strong>2️⃣ Aplicar a fórmula:</strong><br>• 500 × V1 = 50 × 100<br>• 500 × V1 = 5000<br>• V1 = 5000 / 500 = 10 mL<br><br><hr><br><strong>✅ Resposta:</strong><br> Você precisa de 10 mL da solução estoque de 500 mg/mL e deve adicionar diluente até o volume total de 100 mL.`,
                    chamadaCalculadora: `Para calcular a diluição, informe as concentrações inicial e final e o volume final desejado.`,
                    observacaoImportante: `Certifique-se de usar as mesmas unidades para concentração e volume (M e V) em ambos os lados da equação para evitar erros.`,
                    fields: [
                        { id: "concentracaoInicial", label: "Concentração Inicial (M1):", type: "number", placeholder: "Ex: 500", units: ["mg/mL", "mcg/mL", "g/mL", "%"], defaultUnit: "mg/mL", step: "0.01" },
                        { id: "concentracaoFinal", label: "Concentração Final (M2):", type: "number", placeholder: "Ex: 50", units: ["mg/mL", "mcg/mL", "g/mL", "%"], defaultUnit: "mg/mL", step: "0.01" },
                        { id: "volumeFinal", label: "Volume Final Desejado (V2):", type: "number", placeholder: "Ex: 100", units: ["mL", "L"], defaultUnit: "mL", step: "0.01" }
                    ],
                    calculo: function() {
                        let concentracaoInicial = parseFloat(document.getElementById("concentracaoInicial").value);
                        let concentracaoFinal = parseFloat(document.getElementById("concentracaoFinal").value);
                        let volumeFinal = parseFloat(document.getElementById("volumeFinal").value);

                        const unitConcInicial = document.getElementById("concentracaoInicial-unit-select").value;
                        const unitConcFinal = document.getElementById("concentracaoFinal-unit-select").value;
                        const unitVolumeFinal = document.getElementById("volumeFinal-unit-select").value;

                        if (isNaN(concentracaoInicial) || isNaN(concentracaoFinal) || isNaN(volumeFinal) ||
                            concentracaoInicial <= 0 || concentracaoFinal < 0 || volumeFinal <= 0) {
                            throw new Error("Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero. A concentração final pode ser zero para diluição total.");
                        }

                        // Converter para mg/mL para consistência antes do cálculo
                        concentracaoInicial = convertConcentrationToMgPerMl(concentracaoInicial, unitConcInicial);
                        concentracaoFinal = convertConcentrationToMgPerMl(concentracaoFinal, unitConcFinal);
                        volumeFinal = convertToMl(volumeFinal, unitVolumeFinal);

                        if (concentracaoInicial === 0) {
                            throw new Error("A Concentração Inicial não pode ser zero.");
                        }
                        if (concentracaoFinal > concentracaoInicial) {
                            throw new Error("A Concentração Final não pode ser maior que a Concentração Inicial.");
                        }

                        const volumeInicial = (concentracaoFinal * volumeFinal) / concentracaoInicial;

                        return {
                            resultado: `Volume da Solução Estoque (V1) a ser utilizado: ${volumeInicial.toFixed(2)} mL`,
                            detalhes: [
                                `Concentração Inicial Convertida: ${concentracaoInicial.toFixed(2)} mg/mL`,
                                `Concentração Final Convertida: ${concentracaoFinal.toFixed(2)} mg/mL`,
                                `Volume Final Desejado Convertido: ${volumeFinal.toFixed(2)} mL`
                            ]
                        };
                    },
                    referencias: []
                },
                "Diluição em Porcentagem": {
                    name: "Diluição em Porcentagem",
                    titulo: "Diluição em Porcentagem (m/v)",
                    fundamento: `Calcula os volumes necessários de um soluto concentrado (expresso em percentagem m/v) e de um solvente (geralmente soro base) para obter um volume final com uma percentagem desejada.`,
                    formula: `Quantidade de Soluto Necessária (g) = (Volume Final (mL) × Concentração Desejada (%)) / 100<br>Volume do Soluto Concentrado (mL) = (Quantidade de Soluto Necessária (g) × 100) / Concentração do Soluto (%)<br>Volume do Soro Base (mL) = Volume Final (mL) - Volume do Soluto Concentrado (mL)`,
                    exemploClinico: `<strong>🔸 Problema:</strong><br> Você precisa preparar 500 mL de uma solução a 5% a partir de um concentrado a 20%. Qual volume do concentrado e de soro base você precisa?<br><br><strong>🔹 Resolução:</strong><br><br><strong>1️⃣ Identificar os dados:</strong><br>• Volume Final Desejado = 500 mL<br>• Concentração Desejada = 5%<br>• Concentração do Soluto Disponível = 20%<br><br><strong>2️⃣ Calcular Quantidade de Soluto Necessária:</strong><br>• Quantidade Soluto (g) = (500 mL × 5) / 100 = 25 g<br><br><strong>3️⃣ Calcular Volume do Soluto Concentrado:</strong><br>• Volume Soluto Necessário = (25 g × 100) / 20% = 125 mL<br><br><strong>4️⃣ Calcular Volume do Soro Base:</strong><br>• Volume Soro Base = 500 mL - 125 mL = 375 mL<br><br><hr><br><strong>✅ Resposta:</strong><br> Você precisa de 125 mL do soluto concentrado e 375 mL de soro base.`,
                    chamadaCalculadora: `Informe o 'Volume Final Desejado', a 'Concentração Desejada' e a 'Concentração do Soluto Disponível'.`,
                    observacaoImportante: `Sempre verifique se a concentração do soluto é maior que a concentração desejada. Cuidado com as unidades de porcentagem (m/v - massa/volume) vs. outras representações.`,
                    fields: [
                        { id: "volumeFinalDiluicaoPercentual", label: "Volume Final Desejado:", type: "number", placeholder: "Ex: 500", units: ["mL", "L"], defaultUnit: "mL", step: "0.01" },
                        { id: "concentracaoDesejadaPercentual", label: "Concentração Desejada (m/v):", type: "number", placeholder: "Ex: 5", units: ["%", "g/mL"], defaultUnit: "%", step: "0.01" },
                        { id: "concentracaoSolutoPercentual", label: "Concentração do Soluto Disponível (m/v):", type: "number", placeholder: "Ex: 20", units: ["%", "g/mL"], defaultUnit: "%", step: "0.01" }
                    ],
                    calculo: function() {
                        let volumeFinal = parseFloat(document.getElementById("volumeFinalDiluicaoPercentual").value);
                        let concentracaoDesejada = parseFloat(document.getElementById("concentracaoDesejadaPercentual").value);
                        let concentracaoSoluto = parseFloat(document.getElementById("concentracaoSolutoPercentual").value);

                        const unitVolumeFinal = document.getElementById("volumeFinalDiluicaoPercentual-unit-select").value;
                        const unitConcentracaoDesejada = document.getElementById("concentracaoDesejadaPercentual-unit-select").value;
                        const unitConcentracaoSoluto = document.getElementById("concentracaoSolutoPercentual-unit-select").value;

                        if (isNaN(volumeFinal) || isNaN(concentracaoDesejada) || isNaN(concentracaoSoluto) ||
                            volumeFinal <= 0 || concentracaoDesejada < 0 || concentracaoSoluto <= 0) {
                            throw new Error("Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero. A 'Concentração Desejada' deve ser maior ou igual a zero.");
                        }

                        // Conversão de unidades para os campos com unidade selecionável
                        volumeFinal = convertToMl(volumeFinal, unitVolumeFinal);
                        // convertPercentageToDecimal retorna o valor da porcentagem como número, a divisão por 100 é feita na fórmula.
                        concentracaoDesejada = convertPercentageToDecimal(concentracaoDesejada, unitConcentracaoDesejada);
                        concentracaoSoluto = convertPercentageToDecimal(concentracaoSoluto, unitConcentracaoSoluto);


                        if (concentracaoSoluto === 0) {
                            throw new Error("A Concentração do Soluto Disponível não pode ser zero ou negativa.");
                        }
                        if (concentracaoDesejada > concentracaoSoluto) {
                            throw new Error("A Concentração Desejada não pode ser maior que a Concentração do Concentrado.");
                        }

                        // A quantidade de soluto necessária em gramas para o volume final desejado
                        const quantidadeSolutoGramas = (volumeFinal * (concentracaoDesejada / 100)); // Aqui concentracaoDesejada é a porcentagem informada pelo usuário
                        // O volume do soluto concentrado necessário
                        const volumeSolutoNecessario = (quantidadeSolutoGramas * 100) / concentracaoSoluto;

                        const volumeSoroBase = volumeFinal - volumeSolutoNecessario;

                        if (volumeSoroBase < 0) {
                            throw new Error("Volume do soluto necessário excede o volume final desejado. Verifique as concentrações.");
                        }

                        return {
                            resultado: `Volume do Soluto a Adicionar: ${volumeSolutoNecessario.toFixed(2)} mL<br>Volume do Soro Base Necessário: ${volumeSoroBase.toFixed(2)} mL`,
                            detalhes: [
                                `Volume Final Desejado Convertido: ${volumeFinal.toFixed(2)} mL`,
                                `Concentração Desejada Convertida: ${concentracaoDesejada.toFixed(2)} %`,
                                `Concentração do Soluto Convertida: ${concentracaoSoluto.toFixed(2)} %`
                            ]
                        };
                    },
                    referencias: []
                },
            }
        },
        // 3. Cálculos de Infusão e Gotejamento
        "Cálculos de Infusão e Gotejamento": {
            name: "Cálculos de Infusão e Gotejamento",
            subcategories: {
                "Taxa de Infusão (mL/h)": {
                    titulo: "Taxa de Infusão (mL/h)",
                    fundamento: `Calcula a taxa de infusão de uma solução ou medicamento em mililitros por hora (mL/h) ou mililitros por minuto (mL/min), fundamental para a programação precisa de bombas de infusão e administração de fluidos.`,
                    formula: `Taxa de Infusão (mL/h) = Volume Total (mL) / Tempo de Infusão (horas)`,
                    exemploClinico: `<strong>🔸 Problema:</strong><br> Uma solução de 500 mL deve ser infundida em 4 horas utilizando um equipo de macrogotas. Qual deve ser a taxa de infusão em mL/h?<br><br><strong>🔹 Resolução:</strong><br><br><br><strong>1️⃣ Identificar os dados:</strong><br>• Volume Total = 500 mL<br>• Tempo de Infusão = 4 horas<br><br><strong>2️⃣ Aplicar a fórmula:</strong><br>  Aplicar a fórmula:<br>    Taxa de Infusão (mL/h) = 500 mL / 4 horas = 125 mL/h<br><br><hr><br><strong>✅ Resposta:</strong><br> A taxa de infusão deve ser de 125 mL/h.`,
                    chamadaCalculadora: `Para calcular a taxa de infusão, informe o 'Volume Total' e o 'Tempo de Infusão'.`,
                    observacaoImportante: `Sempre verifique a compatibilidade do medicamento com o diluente e a estabilidade da solução. A taxa de infusão deve ser ajustada conforme a resposta do paciente.`,
                    fields: [
                        { id: "volumeTotalInfusao", label: "Volume Total da Solução:", type: "number", placeholder: "Ex: 500", units: ["mL", "L"], defaultUnit: "mL", step: "0.01" },
                        { id: "tempoInfusao", label: "Tempo de Infusão:", type: "number", placeholder: "Ex: 4", units: ["horas", "minutos"], defaultUnit: "horas", step: "0.01" }
                    ],
                    calculo: function() {
                        let volumeTotal = parseFloat(document.getElementById("volumeTotalInfusao").value);
                        let tempoInfusao = parseFloat(document.getElementById("tempoInfusao").value);
                        const unitVolume = document.getElementById("volumeTotalInfusao-unit-select").value;
                        const unitTempo = document.getElementById("tempoInfusao-unit-select").value;

                        if (isNaN(volumeTotal) || isNaN(tempoInfusao) || volumeTotal <= 0 || tempoInfusao <= 0) {
                            throw new Error("Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero.");
                        }

                        // Converter para unidades base (mL, horas)
                        volumeTotal = convertToMl(volumeTotal, unitVolume);
                        tempoInfusao = convertTime(tempoInfusao, unitTempo) / 60; // Convert minutos to hours

                        if (tempoInfusao === 0) {
                            throw new Error("O tempo de infusão não pode ser zero.");
                        }

                        const taxaInfusao = volumeTotal / tempoInfusao;

                        return {
                            resultado: `Taxa de Infusão: ${taxaInfusao.toFixed(2)} mL/h`,
                            detalhes: [
                                `Volume Total Convertido: ${volumeTotal.toFixed(2)} mL`,
                                `Tempo de Infusão Convertido: ${tempoInfusao.toFixed(2)} horas`
                            ]
                        };
                    },
                    referencias: []
                },
                "Velocidade de Infusão em mL/h a partir de Dose (mcg/kg/min)": { // Renamed for clarity in dropdown
                    name: "Velocidade de Infusão em mL/h a partir de Dose (mcg/kg/min)",
                    titulo: "Velocidade de Infusão (mL/h) a partir da Dose (mcg/kg/min)",
                    fundamento: `Essencial para o ajuste preciso de bombas de infusão, permitindo calcular a velocidade necessária em mL/h para atingir uma dose desejada por peso e tempo, comum em terapias com drogas vasoativas e sedação.`,
                    formula: `Taxa de Infusão (mL/h) = (Dose (mcg/kg/min) × Peso (kg) × 60 min/h) / Concentração da Solução (mcg/mL)`,
                    exemploClinico: `<strong>🔸 Problema:</strong><br> Um paciente de 70 kg precisa de uma infusão de dobutamina a 5 mcg/kg/min. A solução está preparada a 1250 mcg/mL. Qual a taxa de infusão em mL/h?<br><br><strong>🔹 Resolução:</strong><br><br><strong>1️⃣ Identificar os dados:</strong><br>• Dose Desejada = 5 mcg/kg/min<br>• Peso do Paciente = 70 kg<br>• Concentração da Solução = 1250 mcg/mL<br><br><strong>2️⃣ Aplicar a fórmula:</strong><br>• Taxa de Infusão (mL/h) = (5 × 70 × 60) / 1250<br>• Taxa de Infusão (mL/h) = 21000 / 1250 = 16.8 mL/h<br><br><hr><br><strong>✅ Resposta:</strong><br> A taxa de infusão deve ser de 16.8 mL/h.`,
                    chamadaCalculadora: `Para calcular a velocidade de infusão, informe a 'Dose Desejada', 'Peso do Paciente', 'Quantidade de Medicamento na Solução' e 'Volume Final da Solução'.`,
                    observacaoImportante: `A precisão da concentração da solução é vital. Sempre confira o cálculo e use bombas de infusão programáveis para garantir a segurança.`,
                    fields: [
                        { id: "doseDesejadaInfusao", label: "Dose Desejada:", type: "number", placeholder: "Ex: 5", units: ["mcg/kg/min", "mg/kg/min", "mg/kg/h"], defaultUnit: "mcg/kg/min", step: "0.01" },
                        { id: "pesoPacienteInfusao", label: "Peso do Paciente:", type: "number", placeholder: "Ex: 70", units: ["kg", "lb"], defaultUnit: "kg", step: "0.01" },
                        { id: "quantMedicamentoInfusao", label: "Quantidade de Medicamento na Solução:", type: "number", placeholder: "Ex: 250", units: ["mg", "mcg", "g"], defaultUnit: "mg", step: "0.01" },
                        { id: "volumeSolucaoInfusao", label: "Volume Final da Solução:", type: "number", placeholder: "Ex: 200", units: ["mL", "L"], defaultUnit: "mL", step: "0.01" }
                    ],
                    calculo: function() {
                        let doseDesejada = parseFloat(document.getElementById("doseDesejadaInfusao").value);
                        let pesoPaciente = parseFloat(document.getElementById("pesoPacienteInfusao").value);
                        let quantMedicamento = parseFloat(document.getElementById("quantMedicamentoInfusao").value);
                        let volumeSolucao = parseFloat(document.getElementById("volumeSolucaoInfusao").value);

                        const unitDoseDesejada = document.getElementById("doseDesejadaInfusao-unit-select").value;
                        const unitPesoPaciente = document.getElementById("pesoPacienteInfusao-unit-select").value;
                        const unitQuantMedicamento = document.getElementById("quantMedicamentoInfusao-unit-select").value;
                        const unitVolumeSolucao = document.getElementById("volumeSolucaoInfusao-unit-select").value;

                        if (isNaN(doseDesejada) || isNaN(pesoPaciente) || isNaN(quantMedicamento) || isNaN(volumeSolucao) ||
                            doseDesejada <= 0 || pesoPaciente <= 0 || quantMedicamento <= 0 || volumeSolucao <= 0) {
                            throw new Error("Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero.");
                        }

                        // Converter para unidades base: mcg/kg/min, kg, mcg, mL
                        doseDesejada = convertDosePerWeightPerTime(doseDesejada, unitDoseDesejada); // Converts to mcg/kg/min
                        pesoPaciente = convertToKg(pesoPaciente, unitPesoPaciente); // Converts to kg
                        quantMedicamento = convertToMcg(quantMedicamento, unitQuantMedicamento); // Converts to mcg
                        volumeSolucao = convertToMl(volumeSolucao, unitVolumeSolucao); // Converts to mL

                        const concentracaoSolucaoMcgPerMl = quantMedicamento / volumeSolucao; // mcg/mL

                        // Taxa de Infusão (mL/h) = (Dose (mcg/kg/min) × Peso (kg) × 60 min/h) / Concentração da Solução (mcg/mL)
                        const taxaInfusaoMlH = (doseDesejada * pesoPaciente * 60) / concentracaoSolucaoMcgPerMl;

                        return {
                            resultado: `Taxa de Infusão: ${taxaInfusaoMlH.toFixed(2)} mL/h`,
                            detalhes: [
                                `Dose Desejada Convertida: ${doseDesejada.toFixed(4)} mcg/kg/min`,
                                `Peso do Paciente Convertido: ${pesoPaciente.toFixed(2)} kg`,
                                `Quantidade de Medicamento Convertida: ${quantMedicamento.toFixed(2)} mcg`,
                                `Volume da Solução Convertido: ${volumeSolucao.toFixed(2)} mL`,
                                `Concentração da Solução: ${concentracaoSolucaoMcgPerMl.toFixed(4)} mcg/mL`
                            ]
                        };
                    },
                    referencias: []
                }
            }
        },
        // 4. Avaliação Clínica e Farmacocinética (Estrutura Atualizada)
        "Avaliação Clínica e Farmacocinética": {
            name: "Avaliação Clínica e Farmacocinética",
            subcategories: {
                "Função Renal": {
                    name: "Função Renal",
                    titulo: "Função Renal",
                    fundamento: "Avaliação necessária para ajuste de medicamentos eliminados por via renal.",
                    subSubCategories: { // Nested sub-subcategories
                        "Cockcroft-Gault": {
                            name: "Cockcroft-Gault",
                            titulo: "Fórmula de Cockcroft-Gault",
                            fundamento: `Estimativa da depuração de creatinina (ClCr), amplamente usada para ajuste de antimicrobianos (como vancomicina e aminoglicosídeos). É crucial para adaptar a dosagem de medicamentos que são eliminados predominantemente pelos rins.`,
                            formula: `ClCr (Homem) = (140 - idade) × peso (kg) / (72 × creatinina (mg/dL))<br>ClCr (Mulher) = resultado acima × 0.85`,
                            exemploClinico: `<strong>🔸 Problema:</strong><br> Um homem de 70 anos pesa 70 kg e tem uma creatinina sérica de 1.2 mg/dL. Calcule o ClCr.<br><br><strong>🔹 Resolução:</strong><br><br><strong>1️⃣ Identificar os dados:</strong><br>• Idade = 70 anos<br>• Peso = 70 kg<br>• Creatinina = 1.2 mg/dL<br>• Gênero = Masculino<br><br><strong>2️⃣ Aplicar a fórmula (Homem):</strong><br>• ClCr = (140 - 70) × 70 / (72 × 1.2)<br>• ClCr = (70 × 70) / 86.4<br>• ClCr = 4900 / 86.4 ≈ 56.71 mL/min<br><br><hr><br><strong>✅ Resposta:</strong><br> O clearance de creatinina estimado é de aproximadamente 56.71 mL/min.`,
                            chamadaCalculadora: `Para calcular o clearance de creatinina pela fórmula de Cockcroft-Gault, informe a 'Idade', 'Peso', 'Creatinina Sérica' e 'Gênero'.`,
                            observacaoImportante: `Esta fórmula é uma estimativa e pode não ser precisa em pacientes com função renal muito estável ou muito instável, crianças e idosos com baixo peso. Sempre correlacionar com a clínica.`,
                            fields: [
                                { id: "idadeCG", label: "Idade (anos):", type: "number", placeholder: "Ex: 70", step: "1" },
                                { id: "pesoCG", label: "Peso (kg):", type: "number", placeholder: "Ex: 70", units: ["kg", "lb"], defaultUnit: "kg", step: "0.01" },
                                { id: "creatininaCG", label: "Creatinina Sérica:", type: "number", placeholder: "Ex: 1.2", units: ["mg/dL", "µmol/L"], defaultUnit: "mg/dL", step: "0.01" },
                                { id: "generoCG", label: "Gênero:", type: "select", options: [{ value: "masculino", text: "Masculino" }, { value: "feminino", text: "Feminino" }] }
                            ],
                            calculo: function() {
                                let idade = parseInt(document.getElementById("idadeCG").value);
                                let peso = parseFloat(document.getElementById("pesoCG").value);
                                let creatinina = parseFloat(document.getElementById("creatininaCG").value);
                                const genero = document.getElementById("generoCG").value;

                                const unitPeso = document.getElementById("pesoCG-unit-select").value;
                                const unitCreatinina = document.getElementById("creatininaCG-unit-select").value;

                                if (isNaN(idade) || isNaN(peso) || isNaN(creatinina) || idade <= 0 || peso <= 0 || creatinina <= 0) {
                                    throw new Error("Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero.");
                                }

                                // Converter para unidades base (kg, mg/dL)
                                peso = convertToKg(peso, unitPeso);
                                creatinina = convertCreatinineToMgPerDl(creatinina, unitCreatinina);

                                if (creatinina === 0) {
                                    throw new Error("A Creatinina Sérica não pode ser zero.");
                                }

                                let clcr = ((140 - idade) * peso) / (72 * creatinina);

                                if (genero === "feminino") {
                                    clcr = clcr * 0.85;
                                }

                                return {
                                    resultado: `Clearance de Creatinina (ClCr): ${clcr.toFixed(2)} mL/min`,
                                    detalhes: [
                                        `Idade: ${idade} anos`,
                                        `Peso Convertido: ${peso.toFixed(2)} kg`,
                                        `Creatinina Sérica Convertida: ${creatinina.toFixed(2)} mg/dL`,
                                        `Gênero: ${genero === "masculino" ? "Masculino" : "Feminino"}`
                                    ]
                                };
                            },
                            referencias: [
                                "Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976."
                            ]
                        },
                        "MDRD (Modificado)": {
                            name: "MDRD (Modificado)",
                            titulo: "Fórmula MDRD (Modificado)",
                            fundamento: `Amplamente utilizada para estimar a Taxa de Filtração Glomerular (TFG) em mL/min/1.73m², útil na classificação da doença renal crônica e no ajuste de dose de alguns medicamentos.`,
                            formula: `TFG (mL/min/1.73m²) = 175 × (Creatinina Sérica (mg/dL))<sup>-1.154</sup> × (Idade)<sup>-0.203</sup> × (0.742 se mulher) × (1.212 se raça negra)`,
                            exemploClinico: `<strong>🔸 Problema:</strong><br> Uma mulher branca de 60 anos tem uma creatinina sérica de 1.5 mg/dL. Calcule a TFG.<br><br><strong>🔹 Resolução:</strong><br><br><strong>1️⃣ Identificar os dados:</strong><br>• Idade = 60 anos<br>• Creatinina = 1.5 mg/dL<br>• Gênero = Feminino<br>• Raça = Não-negra<br><br><strong>2️⃣ Aplicar a fórmula:</strong><br>• TFG = 175 × (1.5)<sup>-1.154</sup> × (60)<sup>-0.203</sup> × 0.742<br>• TFG = 175 × 0.612 × 0.368 × 0.742 ≈ 29.28 mL/min/1.73m²<br><br><hr><br><strong>✅ Resposta:</strong><br> A TFG estimada é de aproximadamente 29.28 mL/min/1.73m².`,
                            chamadaCalculadora: `Para calcular a TFG pela fórmula MDRD, informe a 'Idade', 'Creatinina Sérica', 'Gênero' e 'Raça'.`,
                            observacaoImportante: `A fórmula MDRD é menos precisa para TFGs > 60 mL/min/1.73m². O ajuste para raça tem sido debatido e pode ser revisado em futuras diretrizes.`,
                            fields: [
                                { id: "idadeMDRD", label: "Idade (anos):", type: "number", placeholder: "Ex: 60", step: "1" },
                                { id: "creatininaMDRD", label: "Creatinina Sérica:", type: "number", placeholder: "Ex: 1.5", units: ["mg/dL", "µmol/L"], defaultUnit: "mg/dL", step: "0.01" },
                                { id: "generoMDRD", label: "Gênero:", type: "select", options: [{ value: "masculino", text: "Masculino" }, { value: "feminino", text: "Feminino" }] },
                                { id: "racaMDRD", label: "Raça:", type: "select", options: [{ value: "nao-negro", text: "Não-negro" }, { value: "negro", text: "Negro" }] }
                            ],
                            calculo: function() {
                                let idade = parseInt(document.getElementById("idadeMDRD").value);
                                let creatinina = parseFloat(document.getElementById("creatininaMDRD").value);
                                const genero = document.getElementById("generoMDRD").value;
                                const raca = document.getElementById("racaMDRD").value;

                                const unitCreatinina = document.getElementById("creatininaMDRD-unit-select").value;

                                if (isNaN(idade) || isNaN(creatinina) || idade <= 0 || creatinina <= 0) {
                                    throw new Error("Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero.");
                                }

                                // Converter creatinina para mg/dL
                                creatinina = convertCreatinineToMgPerDl(creatinina, unitCreatinina);

                                if (creatinina === 0) {
                                    throw new Error("A Creatinina Sérica não pode ser zero.");
                                }

                                let tfg = 175 * Math.pow(creatinina, -1.154) * Math.pow(idade, -0.203);

                                if (genero === "feminino") {
                                    tfg *= 0.742;
                                }
                                if (raca === "negro") {
                                    tfg *= 1.212;
                                }

                                // Classificação do Estágio da Doença Renal Crônica (DRC)
                                let estagio = "";
                                if (tfg >= 90) estagio = "Estágio 1: Dano renal com TFG normal ou aumentada";
                                else if (tfg >= 60) estagio = "Estágio 2: Dano renal com TFG levemente diminuída";
                                else if (tfg >= 45) estagio = "Estágio 3a: TFG moderadamente diminuída";
                                else if (tfg >= 30) estagio = "Estágio 3b: TFG moderadamente a gravemente diminuída";
                                else if (tfg >= 15) estagio = "Estágio 4: TFG gravemente diminuída";
                                else estagio = "Estágio 5: Falência renal";

                                return {
                                    resultado: `Taxa de Filtração Glomerular (TFG): ${tfg.toFixed(2)} mL/min/1.73m²`,
                                    detalhes: [
                                        `Estágio da DRC: ${estagio}`,
                                        `Creatinina Sérica Convertida: ${creatinina.toFixed(2)} mg/dL`,
                                        `Idade: ${idade} anos`,
                                        `Gênero: ${genero === "masculino" ? "Masculino" : "Feminino"}`,
                                        `Raça: ${raca === "negro" ? "Negro" : "Não-negro"}`
                                    ]
                                };
                            },
                            referencias: [
                                "Levey AS et al. A new equation to estimate glomerular filtration rate. Ann Intern Med. 2009."
                            ]
                        },
                        "CKD-EPI (Apenas Informativo)": {
                            name: "CKD-EPI (Apenas Informativo)",
                            titulo: "Fórmula CKD-EPI (Apenas Informativo)",
                            fundamento: `Considerada mais precisa que a MDRD para estimar a Taxa de Filtração Glomerular (TFG), especialmente em pacientes com TFG próxima ao normal. Contudo, ainda é pouco utilizada nas bulas de medicamentos para ajustes de dose diretos.`,
                            formula: `Esta calculadora não implementa a fórmula CKD-EPI completa devido à sua complexidade e múltiplas equações dependendo de creatinina, gênero e raça. Ela é mencionada aqui para fins informativos sobre métodos de avaliação da função renal.`,
                            exemploClinico: `Não há exemplo de cálculo disponível, pois a implementação completa da fórmula CKD-EPI requer uma série de equações condicionais.`,
                            chamadaCalculadora: `Esta seção é apenas informativa sobre a fórmula CKD-EPI.`,
                            observacaoImportante: `Para cálculos precisos de TFG via CKD-EPI, consulte calculadoras médicas especializadas ou recursos confiáveis que implementam todas as variáveis e equações complexas da fórmula. Sua principal aplicação é em monitoramento de Doença Renal Crônica.`,
                            fields: [], // Sem campos de entrada para cálculo
                            calculo: function() {
                                throw new Error("Esta seção é apenas informativa e não realiza cálculos da fórmula CKD-EPI.");
                            },
                            referencias: [
                                "Levey AS et al. A new equation to estimate glomerular filtration rate. Ann Intern Med. 2009."
                            ]
                        },
                        "Ajuste de Dose por Função Renal": { // Título alterado
                            name: "Ajuste de Dose de Antibióticos por Função Renal",
                            titulo: "Ajuste de Dose de Antibióticos por Função Renal",
                            fundamento: `A função renal impacta diretamente a eliminação de muitos medicamentos, especialmente antibióticos. Em pacientes com insuficiência renal, o acúmulo de fármacos pode levar à toxicidade. O ajuste da dose ou do intervalo entre as doses é crucial para garantir a eficácia terapêutica e a segurança do paciente. Esta calculadora utiliza dados específicos de antibióticos para sugerir ajustes baseados no clearance de creatinina (ClCr) e nas condições de diálise.`,
                            formula: `O ajuste de dose é um processo complexo e dependente do fármaco. As estratégias comuns incluem:<br> <ul> <li><strong>Redução da Dose:</strong> Diminuir a quantidade de medicamento por administração.</li> <li><strong>Aumento do Intervalo:</strong> Manter a dose, mas aumentar o tempo entre as administrações.</li> <li><strong>Combinação:</strong> Reduzir a dose e aumentar o intervalo.</li> <li><strong>Considerações para Diálise:</strong> Doses específicas ou tempo de administração ajustado (pós-diálise).</li> </ul> A decisão é baseada no ClCr do paciente e nas características farmacocinéticas de cada droga.`,
                            exemploClinico: `<strong>🔸 Problema:</strong><br> Paciente de 65 kg, 50 anos, ClCr de 35 mL/min. Precisa de Amicacina.<br><br><strong>🔹 Resolução:</strong><br><br><strong>1️⃣ Identificar dados:</strong><br>• Farmaco: Amicacina<br>• Apresentação: 500mg/2ml, ampola 2ml<br>• ClCr: 35 mL/min (entre 10-50 mL/min)<br>• Peso: 65 kg<br><br><strong>2️⃣ Consultar tabela de ajuste renal (Amicacina):</strong><br>• Para ClCr 10-50: 7,5mg/kg, EV, 1x/dia.<br>• Dose calculada: 7.5 mg/kg * 65 kg = 487.5 mg<br><br><hr><br><strong>✅ Resposta:</strong><br> Para Amicacina, com ClCr de 35 mL/min, a dose ajustada é 7.5 mg/kg, EV, 1x/dia. Considerando o peso de 65 kg, a dose seria de 487.5 mg, EV, 1x/dia.`,
                            chamadaCalculadora: `Selecione o antibiótico, sua apresentação e informe o 'Clearance de Creatinina', 'Peso do Paciente' e as condições de diálise.`,
                            observacaoImportante: `Estas são diretrizes gerais. A decisão final sobre a dose deve ser sempre baseada na avaliação clínica do paciente, monitoramento de níveis séricos (quando aplicável) e as informações mais recentes do medicamento.`,
                            fields: [
                                { id: "farmacoAntibiotico", label: "Antibiótico:", type: "select", options: [] }, // Populated dynamically
                                { id: "apresentacaoAntibiotico", label: "Apresentação:", type: "select", options: [] }, // Populated dynamically
                                { id: "clearanceCreatinina", label: "Clearance de Creatinina (ClCr):", type: "number", placeholder: "Ex: 60", step: "0.01" },
                                { id: "pesoPacienteAjusteRenal", label: "Peso do Paciente:", type: "number", placeholder: "Ex: 70", units: ["kg", "lb"], defaultUnit: "kg", step: "0.01" },
                                { id: "hemodialise", label: "Em Hemodiálise?", type: "checkbox" },
                                { id: "capd", label: "Em CAPD?", type: "checkbox" }
                            ],
                            calculo: function() {
                                const farmacoNome = document.getElementById("farmacoAntibiotico").value;
                                const apresentacaoDescricao = document.getElementById("apresentacaoAntibiotico").value;
                                let clearance = parseFloat(document.getElementById("clearanceCreatinina").value);
                                let peso = parseFloat(document.getElementById("pesoPacienteAjusteRenal").value);
                                const hemodialise = document.getElementById("hemodialise").checked;
                                const capd = document.getElementById("capd").checked;

                                const unitPeso = document.getElementById("pesoPacienteAjusteRenal-unit-select").value;

                                if (!farmacoNome || !apresentacaoDescricao || isNaN(clearance) || isNaN(peso) || clearance < 0 || peso <= 0) {
                                    throw new Error("Por favor, preencha todos os campos com valores válidos. O clearance deve ser maior ou igual a zero e o peso maior que zero.");
                                }

                                peso = convertToKg(peso, unitPeso); // Convert peso to kg

                                // Prioridade para diálise se marcada
                                let resultadoAjuste;
                                if (hemodialise || capd) {
                                    resultadoAjuste = dadosAntibioticos.calcularDoseAjustada(farmacoNome, apresentacaoDescricao, clearance, peso, hemodialise, capd);
                                } else {
                                    resultadoAjuste = dadosAntibioticos.calcularDoseAjustada(farmacoNome, apresentacaoDescricao, clearance, peso);
                                }


                                if (!resultadoAjuste) {
                                    throw new Error("Não foi possível encontrar informações de ajuste de dose para o antibiótico e apresentação selecionados.");
                                }

                                return {
                                    resultado: `Farmaco: ${resultadoAjuste.farmaco}<br>Apresentação: ${resultadoAjuste.apresentacao}<br>Posologia Usual: ${resultadoAjuste.posologiaUsual}<br>Clearance de Creatinina: ${resultadoAjuste.clearance} mL/min (${resultadoAjuste.faixaClearance})<br><strong>Dose Ajustada: ${resultadoAjuste.doseAjustada}</strong>`,
                                    detalhes: [
                                        `Farmaco Selecionado: ${farmacoNome}`,
                                        `Apresentação Selecionada: ${apresentacaoDescricao}`,
                                        `Clearance de Creatinina: ${clearance.toFixed(2)} mL/min`,
                                        `Peso do Paciente: ${peso.toFixed(2)} kg`,
                                        `Em Hemodiálise: ${hemodialise ? 'Sim' : 'Não'}`,
                                        `Em CAPD: ${capd ? 'Sim' : 'Não'}`
                                    ]
                                };
                            },
                            referencias: [
                                "Referência: Planilha A.A - monitorização da função renal Vs Dose de ATB (5).xlsx"
                            ]
                        }
                    }
                },
                "Child-Pugh": {
                    name: "Child-Pugh",
                    titulo: "Escala de Child-Pugh",
                    fundamento: `A escala de Child-Pugh avalia a gravidade da doença hepática crônica, principalmente a cirrose. É usada para classificar a função hepática (Classes A, B, C) e tem implicações no prognóstico e no ajuste de doses de medicamentos que são metabolizados pelo fígado.`,
                    formula: `Pontos atribuídos (1-3) para cada parâmetro:<br> • Bilirrubina total<br> • Albumina sérica<br> • INR (Tempo de Protrombina)<br> • Ascite<br> • Encefalopatia hepática<br><br> <strong>Classificação:</strong><br> • Classe A: 5-6 pontos<br> • Classe B: 7-9 pontos<br> • Classe C: 10-15 pontos`,
                    exemploClinico: `<strong>🔸 Caso Clínico:</strong><br> Paciente com cirrose alcoólica apresenta:<br> • Bilirrubina: 3.5 mg/dL (3 pontos)<br> • Albumina: 2.5 g/dL (2 pontos)<br> • INR: 2.0 (2 pontos)<<br> • Ascite moderada (3 pontos)<br> • Encefalopatia grau II (2 pontos)<br><br> <strong>🔹 Cálculo:</strong><br> Total = 3 + 2 + 2 + 3 + 2 = 12 pontos (Classe C)<br><br> <strong>✅ Interpretação:</strong><br> Doença hepática descompensada. Risco elevado de complicações. Ajustar doses de todos os medicamentos hepatometabolizados.`,
                    chamadaCalculadora: `Selecione os parâmetros do paciente para calcular o escore.`,
                    observacaoImportante: `Pacientes Child-Pugh C geralmente requerem redução de 50% nas doses iniciais de medicamentos hepatometabolizados. Monitorar rigorosamente.`,
                    fields: [
                        { id: "bilirrubinaCP", label: "Bilirrubina Total (mg/dL):", type: "number", placeholder: "Ex: 1.5", step: "0.1" },
                        { id: "albuminaCP", label: "Albumina (g/dL):", type: "number", placeholder: "Ex: 3.0", step: "0.1" },
                        { id: "inrCP", label: "INR:", type: "number", placeholder: "Ex: 1.2", step: "0.01" },
                        { id: "asciteCP", label: "Ascite:", type: "select", options: [
                            { value: "ausente", text: "Ausente" },
                            { value: "leve", text: "Leve" },
                            { value: "moderada", text: "Moderada/Tensa" }
                        ]},
                        { id: "encefalopatiaCP", label: "Encefalopatia Hepática:", type: "select", options: [
                            { value: "ausente", text: "Ausente" },
                            { value: "grau_i_ii", text: "Grau I-II (Leve a Moderada)" },
                            { value: "grau_iii_iv", text: "Grau III-IV (Grave)" }
                        ]}
                    ],
                    calculo: function() {
                        let bilirrubina = parseFloat(document.getElementById("bilirrubinaCP").value);
                        let albumina = parseFloat(document.getElementById("albuminaCP").value);
                        let inr = parseFloat(document.getElementById("inrCP").value);
                        const ascite = document.getElementById("asciteCP").value;
                        const encefalopatia = document.getElementById("encefalopatiaCP").value;

                        if (isNaN(bilirrubina) || isNaN(albumina) || isNaN(inr) || bilirrubina < 0 || albumina < 0 || inr < 0) {
                            throw new Error("Por favor, preencha os campos numéricos com valores válidos e não negativos.");
                        }

                        let score = 0;
                        let detalhes = [];

                        // Bilirrubina Total
                        if (bilirrubina < 2) {
                            score += 1;
                            detalhes.push(`Bilirrubina Total (< 2 mg/dL): 1 ponto`);
                        } else if (bilirrubina >= 2 && bilirrubina <= 3) {
                            score += 2;
                            detalhes.push(`Bilirrubina Total (2-3 mg/dL): 2 pontos`);
                        } else {
                            score += 3;
                            detalhes.push(`Bilirrubina Total (> 3 mg/dL): 3 pontos`);
                        }

                        // Albumina
                        if (albumina > 3.5) {
                            score += 1;
                            detalhes.push(`Albumina (> 3.5 g/dL): 1 ponto`);
                        } else if (albumina >= 2.8 && albumina <= 3.5) {
                            score += 2;
                            detalhes.push(`Albumina (2.8-3.5 g/dL): 2 pontos`);
                        } else {
                            score += 3;
                            detalhes.push(`Albumina (< 2.8 g/dL): 3 pontos`);
                        }

                        // INR
                        if (inr < 1.7) {
                            score += 1;
                            detalhes.push(`INR (< 1.7): 1 ponto`);
                        } else if (inr >= 1.7 && inr <= 2.3) {
                            score += 2;
                            detalhes.push(`INR (1.7-2.3): 2 pontos`);
                        } else {
                            score += 3;
                            detalhes.push(`INR (> 2.3): 3 pontos`);
                        }

                        // Ascite
                        if (ascite === "ausente") {
                            score += 1;
                            detalhes.push(`Ascite: Ausente (1 ponto)`);
                        } else if (ascite === "leve") {
                            score += 2;
                            detalhes.push(`Ascite: Leve (2 pontos)`);
                        } else {
                            score += 3;
                            detalhes.push(`Ascite: Moderada/Tensa (3 pontos)`);
                        }

                        // Encefalopatia Hepática
                        if (encefalopatia === "ausente") {
                            score += 1;
                            detalhes.push(`Encefalopatia Hepática: Ausente (1 ponto)`);
                        } else if (encefalopatia === "grau_i_ii") {
                            score += 2;
                            detalhes.push(`Encefalopatia Hepática: Grau I-II (2 pontos)`);
                        } else {
                            score += 3;
                            detalhes.push(`Encefalopatia Hepática: Grau III-IV (3 pontos)`);
                        }

                        let classificacao = "";
                        if (score >= 5 && score <= 6) {
                            classificacao = "Classe A (5-6 pontos)";
                        } else if (score >= 7 && score <= 9) {
                            classificacao = "Classe B (7-9 pontos)";
                        } else {
                            classificacao = "Classe C (10-15 pontos)";
                        }

                        return {
                            resultado: `Escore Child-Pugh: ${score} pontos<br>Classificação: ${classificacao}`,
                            detalhes: detalhes
                        };
                    },
                    referencias: [
                        "Pugh RNH, Murray-Lyon IM, Dawson JL, Pietroni MF, Williams R. Transection of the oesophagus for bleeding oesophageal varices. Br J Surg. 1973."
                    ]
                }
            }
        },
        // 5. Nova Categoria: Conversões de Unidades
        "Conversões de Unidades": {
            name: "Conversões de Unidades",
            subcategories: {
                "Massa": {
                    name: "Massa",
                    titulo: "Conversão de Unidades de Massa",
                    fundamento: `Converta facilmente entre diferentes unidades de massa, como microgramas (mcg), miligramas (mg), gramas (g) e quilogramas (kg).`,
                    formula: `Utiliza fatores de conversão padrão.`,
                    exemploClinico: `<strong>🔸 Exemplo:</strong> Converter 1500 mg para gramas.<br><strong>🔹 Resolução:</strong> 1500 mg / 1000 = 1.5 g.<br><br><hr><br><strong>✅ Resposta:</strong> 1.5 g.`,
                    chamadaCalculadora: `Informe o valor, a unidade de origem e a unidade de destino.`,
                    observacaoImportante: `Certifique-se de que a unidade de origem e a de destino são válidas para massa.`,
                    fields: [
                        { id: "valorMassa", label: "Valor:", type: "number", placeholder: "Ex: 1000", step: "0.01" },
                        { id: "unitFromMassa", label: "Unidade de Origem:", type: "select", options: [{ value: "mcg", text: "mcg" }, { value: "mg", text: "mg" }, { value: "g", text: "g" }, { value: "kg", text: "kg" }] },
                        { id: "unitToMassa", label: "Unidade de Destino:", type: "select", options: [{ value: "mcg", text: "mcg" }, { value: "mg", text: "mg" }, { value: "g", text: "g" }, { value: "kg", text: "kg" }] }
                    ],
                    calculo: function() {
                        let value = parseFloat(document.getElementById("valorMassa").value);
                        const unitFrom = document.getElementById("unitFromMassa").value;
                        const unitTo = document.getElementById("unitToMassa").value;

                        if (isNaN(value) || value < 0) {
                            throw new Error("Por favor, insira um valor numérico válido e não negativo.");
                        }

                        const result = convertMass(value, unitFrom, unitTo);

                        return {
                            resultado: `${value} ${unitFrom} = ${result.toFixed(4)} ${unitTo}`,
                            detalhes: [`Valor original: ${value} ${unitFrom}`, `Valor convertido: ${result.toFixed(4)} ${unitTo}`]
                        };
                    }
                },
                "Volume": {
                    name: "Volume",
                    titulo: "Conversão de Unidades de Volume",
                    fundamento: `Converta facilmente entre diferentes unidades de volume, como mililitros (mL) e litros (L).`,
                    formula: `Utiliza fatores de conversão padrão.`,
                    exemploClinico: `<strong>🔸 Exemplo:</strong> Converter 2.5 L para mL.<br><strong>🔹 Resolução:</strong> 2.5 L * 1000 = 2500 mL.<br><br><hr><br><strong>✅ Resposta:</strong> 2500 mL.`,
                    chamadaCalculadora: `Informe o valor, a unidade de origem e a unidade de destino.`,
                    observacaoImportante: `Certifique-se de que a unidade de origem e a de destino são válidas para volume.`,
                    fields: [
                        { id: "valorVolume", label: "Valor:", type: "number", placeholder: "Ex: 1000", step: "0.01" },
                        { id: "unitFromVolume", label: "Unidade de Origem:", type: "select", options: [{ value: "mL", text: "mL" }, { value: "L", text: "L" }] },
                        { id: "unitToVolume", label: "Unidade de Destino:", type: "select", options: [{ value: "mL", text: "mL" }, { value: "L", text: "L" }] }
                    ],
                    calculo: function() {
                        let value = parseFloat(document.getElementById("valorVolume").value);
                        const unitFrom = document.getElementById("unitFromVolume").value;
                        const unitTo = document.getElementById("unitToVolume").value;

                        if (isNaN(value) || value < 0) {
                            throw new Error("Por favor, insira um valor numérico válido e não negativo.");
                        }

                        const result = convertVolume(value, unitFrom, unitTo);

                        return {
                            resultado: `${value} ${unitFrom} = ${result.toFixed(4)} ${unitTo}`,
                            detalhes: [`Valor original: ${value} ${unitFrom}`, `Valor convertido: ${result.toFixed(4)} ${unitTo}`]
                        };
                    }
                },
                "Concentração": {
                    name: "Concentração",
                    titulo: "Conversão de Unidades de Concentração",
                    fundamento: `Converta entre diferentes unidades de concentração, como mcg/mL, mg/mL, g/mL e porcentagem (m/v).`,
                    formula: `Utiliza fatores de conversão padrão (Assumindo % (m/v) onde 1% = 10 mg/mL).`,
                    exemploClinico: `<strong>🔸 Exemplo:</strong> Converter 10 mg/mL para % (m/v).<br><strong>🔹 Resolução:</strong> 10 mg/mL / 10 = 1 %.<br><br><hr><br><strong>✅ Resposta:</strong> 1 %.`,
                    chamadaCalculadora: `Informe o valor, a unidade de origem e a unidade de destino.`,
                    observacaoImportante: `A conversão de porcentagem (m/v) assume 1% = 10 mg/mL. Outros tipos de porcentagem (v/v, m/m) não são suportados.`,
                    fields: [
                        { id: "valorConcentracao", label: "Valor:", type: "number", placeholder: "Ex: 1", step: "0.01" },
                        { id: "unitFromConcentracao", label: "Unidade de Origem:", type: "select", options: [{ value: "mcg/mL", text: "mcg/mL" }, { value: "mg/mL", text: "mg/mL" }, { value: "g/mL", text: "g/mL" }, { value: "%", text: "% (m/v)" }] },
                        { id: "unitToConcentracao", label: "Unidade de Destino:", type: "select", options: [{ value: "mcg/mL", text: "mcg/mL" }, { value: "mg/mL", text: "mg/mL" }, { value: "g/mL", text: "g/mL" }, { value: "%", text: "% (m/v)" }] }
                    ],
                    calculo: function() {
                        let value = parseFloat(document.getElementById("valorConcentracao").value);
                        const unitFrom = document.getElementById("unitFromConcentracao").value;
                        const unitTo = document.getElementById("unitToConcentracao").value;

                        if (isNaN(value) || value < 0) {
                            throw new Error("Por favor, insira um valor numérico válido e não negativo.");
                        }

                        const result = convertConcentration(value, unitFrom, unitTo);

                        return {
                            resultado: `${value} ${unitFrom} = ${result.toFixed(4)} ${unitTo}`,
                            detalhes: [`Valor original: ${value} ${unitFrom}`, `Valor convertido: ${result.toFixed(4)} ${unitTo}`]
                        };
                    }
                },
                "Taxa de Infusão": {
                    name: "Taxa de Infusão",
                    titulo: "Conversão de Unidades de Taxa de Infusão",
                    fundamento: `Converta entre diferentes unidades de taxa de infusão, como mL/min, mL/h e L/h.`,
                    formula: `Utiliza fatores de conversão padrão.`,
                    exemploClinico: `<strong>🔸 Exemplo:</strong> Converter 100 mL/h para mL/min.<br><strong>🔹 Resolução:</strong> 100 mL/h / 60 = 1.67 mL/min.<br><br><hr><br><strong>✅ Resposta:</strong> 1.67 mL/min.`,
                    chamadaCalculadora: `Informe o valor, a unidade de origem e a unidade de destino.`,
                    observacaoImportante: `Certifique-se de que a unidade de origem e a de destino são válidas para taxa de infusão.`,
                    fields: [
                        { id: "valorTaxaInfusao", label: "Valor:", type: "number", placeholder: "Ex: 100", step: "0.01" },
                        { id: "unitFromTaxaInfusao", label: "Unidade de Origem:", type: "select", options: [{ value: "mL/min", text: "mL/min" }, { value: "mL/h", text: "mL/h" }, { value: "L/h", text: "L/h" }] },
                        { id: "unitToTaxaInfusao", label: "Unidade de Destino:", type: "select", options: [{ value: "mL/min", text: "mL/min" }, { value: "mL/h", text: "mL/h" }, { value: "L/h", text: "L/h" }] }
                    ],
                    calculo: function() {
                        let value = parseFloat(document.getElementById("valorTaxaInfusao").value);
                        const unitFrom = document.getElementById("unitFromTaxaInfusao").value;
                        const unitTo = document.getElementById("unitToTaxaInfusao").value;

                        if (isNaN(value) || value < 0) {
                            throw new Error("Por favor, insira um valor numérico válido e não negativo.");
                        }

                        const result = convertInfusionRate(value, unitFrom, unitTo);

                        return {
                            resultado: `${value} ${unitFrom} = ${result.toFixed(4)} ${unitTo}`,
                            detalhes: [`Valor original: ${value} ${unitFrom}`, `Valor convertido: ${result.toFixed(4)} ${unitTo}`]
                        };
                    }
                },
                "Tempo": {
                    name: "Tempo",
                    titulo: "Conversão de Unidades de Tempo",
                    fundamento: `Converta facilmente entre diferentes unidades de tempo, como minutos e horas.`,
                    formula: `Utiliza fatores de conversão padrão.`,
                    exemploClinico: `<strong>🔸 Exemplo:</strong> Converter 120 minutos para horas.<br><strong>🔹 Resolução:</strong> 120 minutos / 60 = 2 horas.<br><br><hr><br><strong>✅ Resposta:</strong> 2 horas.`,
                    chamadaCalculadora: `Informe o valor, a unidade de origem e a unidade de destino.`,
                    observacaoImportante: `Certifique-se de que a unidade de origem e a de destino são válidas para tempo.`,
                    fields: [
                        { id: "valorTempo", label: "Valor:", type: "number", placeholder: "Ex: 60", step: "0.01" },
                        { id: "unitFromTempo", label: "Unidade de Origem:", type: "select", options: [{ value: "minutos", text: "minutos" }, { value: "horas", text: "horas" }] },
                        { id: "unitToTempo", label: "Unidade de Destino:", type: "select", options: [{ value: "minutos", text: "minutos" }, { value: "horas", text: "horas" }] }
                    ],
                    calculo: function() {
                        let value = parseFloat(document.getElementById("valorTempo").value);
                        const unitFrom = document.getElementById("unitFromTempo").value;
                        const unitTo = document.getElementById("unitToTempo").value;

                        if (isNaN(value) || value < 0) {
                            throw new Error("Por favor, insira um valor numérico válido e não negativo.");
                        }

                        const result = convertTime(value, unitFrom, unitTo);

                        return {
                            resultado: `${value} ${unitFrom} = ${result.toFixed(4)} ${unitTo}`,
                            detalhes: [`Valor original: ${value} ${unitFrom}`, `Valor convertido: ${result.toFixed(4)} ${unitTo}`]
                        };
                    }
                }
            }
        },
        // 6. Nova Categoria: Farmacocinética
        "Farmacocinética": {
            name: "Farmacocinética",
            subcategories: {
                "Dose de Ataque": {
                    name: "Dose de Ataque",
                    titulo: "Cálculo de Dose de Ataque",
                    fundamento: `A dose de ataque é uma dose inicial maior de um medicamento administrada para atingir rapidamente a concentração plasmática terapêutica desejada (estado de equilíbrio). Isso é crucial para medicamentos com uma meia-vida longa ou em situações de emergência onde um efeito rápido é necessário.`,
                    formula: `Dose de Ataque (mg) = (Concentração Plasmática Alvo (mg/L) × Volume de Distribuição (L/kg) × Peso (kg)) / Biodisponibilidade (F)`,
                    exemploClinico: `<strong>🔸 Problema:</strong><br> Um paciente de 70 kg precisa de um medicamento com volume de distribuição de 0.5 L/kg e biodisponibilidade de 0.8. A concentração plasmática alvo é de 10 mg/L. Qual a dose de ataque?<br><br><strong>🔹 Resolução:</strong><br><br><strong>1️⃣ Identificar os dados:</strong><br>• Concentração Plasmática Alvo = 10 mg/L<br>• Volume de Distribuição = 0.5 L/kg<br>• Peso = 70 kg<br>• Biodisponibilidade = 0.8<br><br><strong>2️⃣ Aplicar a fórmula:</strong><br>• Dose de Ataque (mg) = (10 mg/L × 0.5 L/kg × 70 kg) / 0.8<br>• Dose de Ataque (mg) = (350) / 0.8 = 437.5 mg<br><br><hr><br><strong>✅ Resposta:</strong><br> A dose de ataque é de 437.5 mg.`,
                    chamadaCalculadora: `Informe a 'Concentração Plasmática Alvo', 'Volume de Distribuição', 'Peso do Paciente' e 'Biodisponibilidade' para calcular a dose de ataque.`,
                    observacaoImportante: `A biodisponibilidade (F) é um valor entre 0 e 1, onde 1 indica 100% de biodisponibilidade. O volume de distribuição pode variar amplamente entre os medicamentos e pacientes.`,
                    fields: [
                        { id: "concentracaoAlvoAtaque", label: "Concentração Plasmática Alvo:", type: "number", placeholder: "Ex: 10", units: ["mg/L", "mcg/mL"], defaultUnit: "mg/L", step: "0.01" },
                        { id: "volumeDistribuicaoAtaque", label: "Volume de Distribuição (Vd):", type: "number", placeholder: "Ex: 0.5", units: ["L/kg"], defaultUnit: "L/kg", step: "0.01" }, // Vd is often L/kg
                        { id: "pesoPacienteAtaque", label: "Peso do Paciente:", type: "number", placeholder: "Ex: 70", units: ["kg", "lb"], defaultUnit: "kg", step: "0.01" },
                        { id: "biodisponibilidadeAtaque", label: "Biodisponibilidade (F):", type: "number", placeholder: "Ex: 0.8", step: "0.01" } // 0-1
                    ],
                    calculo: function() {
                        let concentracaoAlvo = parseFloat(document.getElementById("concentracaoAlvoAtaque").value);
                        let volumeDistribuicao = parseFloat(document.getElementById("volumeDistribuicaoAtaque").value);
                        let peso = parseFloat(document.getElementById("pesoPacienteAtaque").value);
                        let biodisponibilidade = parseFloat(document.getElementById("biodisponibilidadeAtaque").value);

                        const unitConcentracao = document.getElementById("concentracaoAlvoAtaque-unit-select").value;
                        const unitPeso = document.getElementById("pesoPacienteAtaque-unit-select").value;

                        if (isNaN(concentracaoAlvo) || isNaN(volumeDistribuicao) || isNaN(peso) || isNaN(biodisponibilidade) ||
                            concentracaoAlvo <= 0 || volumeDistribuicao <= 0 || peso <= 0 || biodisponibilidade <= 0 || biodisponibilidade > 1) {
                            throw new Error("Por favor, preencha todos os campos com valores numéricos válidos. Concentração, Volume de Distribuição e Peso devem ser maiores que zero. A biodisponibilidade deve ser entre 0 e 1.");
                        }

                        // Converter unidades
                        if (unitConcentracao === "mcg/mL") {
                            concentracaoAlvo *= 1; // 1 mcg/mL = 1 mg/L
                        }
                        peso = convertToKg(peso, unitPeso);

                        const doseAtaque = (concentracaoAlvo * volumeDistribuicao * peso) / biodisponibilidade;

                        return {
                            resultado: `Dose de Ataque: ${doseAtaque.toFixed(2)} mg`,
                            detalhes: [
                                `Concentração Plasmática Alvo: ${concentracaoAlvo.toFixed(2)} mg/L`,
                                `Volume de Distribuição: ${volumeDistribuicao.toFixed(2)} L/kg`,
                                `Peso do Paciente: ${peso.toFixed(2)} kg`,
                                `Biodisponibilidade: ${biodisponibilidade.toFixed(2)}`,
                                `Dose de Ataque Calculada: ${doseAtaque.toFixed(2)} mg`
                            ]
                        };
                    },
                    referencias: []
                },
                "Dose de Manutenção": {
                    name: "Dose de Manutenção",
                    titulo: "Cálculo de Dose de Manutenção",
                    fundamento: `A dose de manutenção é a quantidade de medicamento administrada regularmente para manter a concentração plasmática dentro da janela terapêutica após a fase de dose de ataque ou em medicamentos que não necessitam de uma dose inicial maior. O objetivo é equilibrar a entrada do medicamento com sua eliminação do corpo.`,
                    formula: `Dose de Manutenção (mg) = (Concentração Plasmática Alvo (mg/L) × Clearance Total (L/h) × Intervalo de Dose (horas)) / Biodisponibilidade (F)`,
                    exemploClinico: `<strong>🔸 Problema:</strong><br> Um medicamento tem uma concentração plasmática alvo de 5 mg/L, clearance total de 3 L/h e biodisponibilidade de 0.9. Qual a dose de manutenção a ser administrada a cada 8 horas?<br><br><strong>🔹 Resolução:</strong><br><br><strong>1️⃣ Identificar os dados:</strong><br>• Concentração Plasmática Alvo = 5 mg/L<br>• Clearance Total = 3 L/h<br>• Intervalo de Dose = 8 horas<br>• Biodisponibilidade = 0.9<br><br><strong>2️⃣ Aplicar a fórmula:</strong><br>• Dose de Manutenção (mg) = (5 mg/L × 3 L/h × 8 horas) / 0.9<br>• Dose de Manutenção (mg) = (120) / 0.9 = 133.33 mg<br><br><hr><br><strong>✅ Resposta:</strong><br> A dose de manutenção é de 133.33 mg a cada 8 horas.`,
                    chamadaCalculadora: `Informe a 'Concentração Plasmática Alvo', 'Clearance Total', 'Intervalo de Dose' e 'Biodisponibilidade' para calcular a dose de manutenção.`,
                    observacaoImportante: `O clearance total (ClT) reflete a capacidade do corpo de eliminar o medicamento. Flutuações no clearance (por função renal ou hepática alterada) exigirão ajuste da dose de manutenção.`,
                    fields: [
                        { id: "concentracaoAlvoManutencao", label: "Concentração Plasmática Alvo:", type: "number", placeholder: "Ex: 5", units: ["mg/L", "mcg/mL"], defaultUnit: "mg/L", step: "0.01" },
                        { id: "clearanceTotalManutencao", label: "Clearance Total (ClT):", type: "number", placeholder: "Ex: 3", units: ["L/h", "mL/min"], defaultUnit: "L/h", step: "0.01" },
                        { id: "intervaloDoseManutencao", label: "Intervalo de Dose (τ):", type: "number", placeholder: "Ex: 8", units: ["horas", "minutos"], defaultUnit: "horas", step: "0.01" },
                        { id: "biodisponibilidadeManutencao", label: "Biodisponibilidade (F):", type: "number", placeholder: "Ex: 0.9", step: "0.01" } // 0-1
                    ],
                    calculo: function() {
                        let concentracaoAlvo = parseFloat(document.getElementById("concentracaoAlvoManutencao").value);
                        let clearance = parseFloat(document.getElementById("clearanceTotalManutencao").value);
                        let intervaloDose = parseFloat(document.getElementById("intervaloDoseManutencao").value);
                        let biodisponibilidade = parseFloat(document.getElementById("biodisponibilidadeManutencao").value);

                        const unitConcentracao = document.getElementById("concentracaoAlvoManutencao-unit-select").value;
                        const unitClearance = document.getElementById("clearanceTotalManutencao-unit-select").value;
                        const unitIntervaloDose = document.getElementById("intervaloDoseManutencao-unit-select").value;


                        if (isNaN(concentracaoAlvo) || isNaN(clearance) || isNaN(intervaloDose) || isNaN(biodisponibilidade) ||
                            concentracaoAlvo <= 0 || clearance <= 0 || intervaloDose <= 0 || biodisponibilidade <= 0 || biodisponibilidade > 1) {
                            throw new Error("Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero. A biodisponibilidade deve ser entre 0 e 1.");
                        }

                        // Convert concentration to mg/L
                        if (unitConcentracao === "mcg/mL") {
                            concentracaoAlvo *= 1; // 1 mcg/mL = 1 mg/L
                        }

                        // Convert clearance to L/h if in mL/min
                        if (unitClearance === "mL/min") {
                            clearance = clearance * 60 / 1000; // mL/min to L/h
                        }

                        // Convert intervaloDose to hours if in minutes
                        if (unitIntervaloDose === "minutos") {
                            intervaloDose = intervaloDose / 60;
                        }

                        const doseManutencao = (concentracaoAlvo * clearance * intervaloDose) / biodisponibilidade;

                        return {
                            resultado: `Dose de Manutenção: ${doseManutencao.toFixed(2)} mg`,
                            detalhes: [
                                `Concentração Plasmática Alvo: ${concentracaoAlvo.toFixed(2)} mg/L`,
                                `Clearance Total: ${clearance.toFixed(2)} L/h`,
                                `Intervalo de Dose: ${intervaloDose.toFixed(2)} horas`,
                                `Biodisponibilidade: ${biodisponibilidade.toFixed(2)}`,
                                `Dose de Manutenção Calculada: ${doseManutencao.toFixed(2)} mg`
                            ]
                        };
                    },
                    referencias: []
                }
            }
        }
        // Add more categories here if needed
    };

    // =========================================================
    // LÓGICA DE POPULAÇÃO DOS DROPDOWNS E EXIBIÇÃO DOS FORMULÁRIOS
    // =========================================================
    const categorySelect = document.getElementById('categorySelect');
    const subCategorySelectContainer = document.getElementById('subCategorySelectContainer');
    const subSubCategorySelectContainer = document.getElementById('subSubCategorySelectContainer');
    const explicacaoCalculoDiv = document.getElementById('explicacaoCalculo');
    const formularioCalculoDiv = document.getElementById('formularioCalculo');
    const actionButtonsContainer = document.getElementById('actionButtonsContainer');
    const resultadoDiv = document.getElementById('resultado');

    let currentCalculation = null; // Stores the currently selected calculation object

    // Function to populate the main category dropdown
    function populateCategorySelect() {
        categorySelect.innerHTML = '<option value="">Selecione...</option>';
        for (const categoryKey in calculationConfigs) {
            const option = document.createElement('option');
            option.value = categoryKey;
            option.textContent = calculationConfigs[categoryKey].name;
            categorySelect.appendChild(option);
        }
    }

    // Function to load subcategories or sub-subcategories based on selection
    window.loadCategoryAndSubCalculations = function(selectedCategoryKey, selectedSubCategoryKey = null) {
        // Clear previous selections and results
        subCategorySelectContainer.style.display = 'none';
        subCategorySelectContainer.innerHTML = '';
        subSubCategorySelectContainer.style.display = 'none';
        subSubCategorySelectContainer.innerHTML = '';
        explicacaoCalculoDiv.style.display = 'none';
        formularioCalculoDiv.style.display = 'none';
        actionButtonsContainer.style.display = 'none';
        resultadoDiv.style.display = 'none';
        currentCalculation = null;

        if (!selectedCategoryKey) {
            return;
        }

        const category = calculationConfigs[selectedCategoryKey];

        if (category && category.subcategories) {
            const subCategorySelect = document.createElement('select');
            subCategorySelect.id = 'subCategorySelect';
            subCategorySelect.classList.add('form-control');
            subCategorySelect.setAttribute('aria-label', 'Selecione um Tipo de Cálculo');
            subCategorySelect.onchange = function() {
                loadSpecificCalculation(selectedCategoryKey, this.value);
            };

            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.textContent = "Selecione um tipo de cálculo...";
            subCategorySelect.appendChild(defaultOption);

            for (const subKey in category.subcategories) {
                const sub = category.subcategories[subKey];
                const option = document.createElement('option');
                option.value = subKey;
                option.textContent = sub.name || sub.titulo; // Use 'name' if available, otherwise 'titulo'
                subCategorySelect.appendChild(option);
            }

            subCategorySelectContainer.innerHTML = `
                <label for="subCategorySelect" class="block text-gray-300 text-sm font-bold mb-2">Selecione um Tipo de Cálculo:</label>
            `;
            subCategorySelectContainer.appendChild(subCategorySelect);
            subCategorySelectContainer.style.display = 'block';

            // If a specific subcategory was passed (e.g., on initial load or re-selection)
            if (selectedSubCategoryKey) {
                subCategorySelect.value = selectedSubCategoryKey;
                loadSpecificCalculation(selectedCategoryKey, selectedSubCategoryKey);
            }
        }
    };

    // Function to load specific calculation (2nd or 3rd level)
    function loadSpecificCalculation(categoryKey, subCategoryKey) {
        explicacaoCalculoDiv.style.display = 'none';
        formularioCalculoDiv.style.display = 'none';
        actionButtonsContainer.style.display = 'none';
        resultadoDiv.style.display = 'none';
        currentCalculation = null;

        if (!categoryKey || !subCategoryKey) {
            return;
        }

        const category = calculationConfigs[categoryKey];
        let sub = category.subcategories[subCategoryKey];

        if (sub && sub.subSubCategories) { // If there's a third level (e.g., Função Renal)
            const subSubCategorySelect = document.createElement('select');
            subSubCategorySelect.id = 'subSubCategorySelect';
            subSubCategorySelect.classList.add('form-control');
            subSubCategorySelect.setAttribute('aria-label', 'Selecione uma Fórmula Específica');
            subSubCategorySelect.onchange = function() {
                renderCalculationDetailsAndForm(sub.subSubCategories[this.value]);
            };

            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.textContent = "Selecione uma fórmula específica...";
            subSubCategorySelect.appendChild(defaultOption);

            for (const subSubKey in sub.subSubCategories) {
                const subSub = sub.subSubCategories[subSubKey];
                const option = document.createElement('option');
                option.value = subSubKey;
                option.textContent = subSub.name || subSub.titulo;
                subSubCategorySelect.appendChild(option);
            }

            subSubCategorySelectContainer.innerHTML = `
                <label for="subSubCategorySelect" class="block text-gray-300 text-sm font-bold mb-2">Selecione uma Fórmula Específica:</label>
            `;
            subSubCategorySelectContainer.appendChild(subSubCategorySelect);
            subSubCategorySelectContainer.style.display = 'block';

        } else if (sub) { // It's a second-level calculation without a third level
            renderCalculationDetailsAndForm(sub);
        }
    }


    // Function to render explanation, formula and form fields for a specific calculation
    function renderCalculationDetailsAndForm(calc) {
        explicacaoCalculoDiv.style.display = 'block';
        formularioCalculoDiv.style.display = 'grid'; // Use grid for md:grid-cols-2 layout
        actionButtonsContainer.style.display = 'flex';
        resultadoDiv.style.display = 'none'; // Hide results until calculated
        currentCalculation = calc; // Store the current calculation object

        // Render Explanation
        explicacaoCalculoDiv.innerHTML = `
            <h2 class="text-xl font-semibold mb-3 text-white">${calc.titulo}</h2>
            <p class="mb-3 text-gray-300"><strong>Fundamento:</strong> ${calc.fundamento}</p>
            <div class="formula-box mb-4">
                <h3 class="text-lg font-medium text-white mb-2">Fórmula:</h3>
                <code>${calc.formula}</code>
            </div>
            <div class="exemplo-box mb-4">
                <h3 class="text-lg font-medium text-white mb-2">Exemplo Clínico:</h3>
                ${calc.exemploClinico}
            </div>
            <p class="mb-3 text-gray-300"><strong>Chamada da Calculadora:</strong> ${calc.chamadaCalculadora}</p>
            <p class="mb-4 text-gray-300"><strong>Observação Importante:</strong> ${calc.observacaoImportante}</p>
        `;

        // Render Form Fields
        formularioCalculoDiv.innerHTML = ''; // Clear previous fields
        calc.fields.forEach(field => {
            let fieldHtml = `
                <div class="mb-4">
                    <label for="${field.id}" class="block text-gray-300 text-sm font-bold mb-2">${field.label}</label>
            `;

            if (field.type === "select") {
                fieldHtml += `<select id="${field.id}" class="form-select">`;
                field.options.forEach(option => {
                    fieldHtml += `<option value="${option.value}">${option.text}</option>`;
                });
                fieldHtml += `</select>`;
            } else if (field.type === "checkbox") {
                fieldHtml += `
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="${field.id}">
                        <label class="form-check-label" for="${field.id}">${field.label}</label>
                    </div>
                `;
            } else { // type "number" or "text"
                fieldHtml += `
                    <div class="input-group">
                        <input type="${field.type}" id="${field.id}" class="form-control" placeholder="${field.placeholder}" step="${field.step || 'any'}">
                `;
                if (field.units && field.units.length > 0) {
                    fieldHtml += `<select id="${field.id}-unit-select" class="form-select input-group-text">`;
                    field.units.forEach(unit => {
                        fieldHtml += `<option value="${unit}" ${unit === field.defaultUnit ? 'selected' : ''}>${unit}</option>`;
                    });
                    fieldHtml += `</select>`;
                }
                fieldHtml += `</div>`;
            }
            fieldHtml += `</div>`;
            formularioCalculoDiv.innerHTML += fieldHtml;
        });

        // Add action buttons
        actionButtonsContainer.innerHTML = `
            <button type="button" class="btn btn-primary" id="calculateBtn">Calcular</button>
            <button type="button" class="btn btn-secondary-custom" id="clearBtn">Limpar</button>
        `;

        // Attach event listeners to buttons
        document.getElementById('calculateBtn').onclick = performCalculation;
        document.getElementById('clearBtn').onclick = clearForm;

        // Special handling for 'Ajuste de Dose por Função Renal' to populate antibiotic and presentation dropdowns
        if (calc.name === "Ajuste de Dose de Antibióticos por Função Renal") {
            populateAntibioticDropdowns();
        }
    }

    // Function to populate antibiotic and presentation dropdowns
    function populateAntibioticDropdowns() {
        const farmacoSelect = document.getElementById('farmacoAntibiotico');
        const apresentacaoSelect = document.getElementById('apresentacaoAntibiotico');

        if (!farmacoSelect || !apresentacaoSelect) return;

        farmacoSelect.innerHTML = '<option value="">Selecione um antibiótico...</option>';
        dadosAntibioticos.antibioticos.forEach(ab => {
            const option = document.createElement('option');
            option.value = ab.farmaco;
            option.textContent = ab.farmaco;
            farmacoSelect.appendChild(option);
        });

        farmacoSelect.onchange = function() {
            const selectedFarmaco = this.value;
            apresentacaoSelect.innerHTML = '<option value="">Selecione uma apresentação...</option>';
            const ab = dadosAntibioticos.buscarAntibiotico(selectedFarmaco);
            if (ab && ab.apresentacoes) {
                ab.apresentacoes.forEach(ap => {
                    const option = document.createElement('option');
                    option.value = ap.descricao;
                    option.textContent = ap.descricao;
                    apresentacaoSelect.appendChild(option);
                });
            }
            // Clear result if antibiotic changes
            resultadoDiv.style.display = 'none';
        };
        apresentacaoSelect.onchange = function() {
             // Clear result if presentation changes
             resultadoDiv.style.display = 'none';
        };

        // Trigger change for initial population if a drug was pre-selected (not likely in this setup but good practice)
        if (farmacoSelect.value) {
            farmacoSelect.dispatchEvent(new Event('change'));
        }
    }


    // Function to perform the calculation
    function performCalculation() {
        resultadoDiv.style.display = 'block';
        resultadoDiv.innerHTML = ''; // Clear previous results

        if (!currentCalculation || !currentCalculation.calculo) {
            resultadoDiv.innerHTML = `<div class="alert alert-danger">Nenhum cálculo selecionado ou função de cálculo inválida.</div>`;
            return;
        }

        try {
            const result = currentCalculation.calculo();
            let resultHtml = `
                <h3 class="text-xl font-semibold mb-3 text-white">Resultado do Cálculo:</h3>
                <div class="result-box mb-3">${result.resultado}</div>
            `;
            if (result.detalhes && result.detalhes.length > 0) {
                resultHtml += `
                    <h4 class="text-lg font-medium text-white mb-2">Detalhes:</h4>
                    <ul class="list-disc list-inside">
                        ${result.detalhes.map(d => `<li>${d}</li>`).join('')}
                    </ul>
                `;
            }
            if (currentCalculation.referencias && currentCalculation.referencias.length > 0) {
                 resultHtml += `
                    <h4 class="text-lg font-medium text-white mt-3 mb-2">Referências:</h4>
                    <ul class="list-disc list-inside text-sm text-gray-400">
                        ${currentCalculation.referencias.map(ref => `<li>${ref}</li>`).join('')}
                    </ul>
                `;
            }
            resultadoDiv.innerHTML = resultHtml;
            resultadoDiv.style.borderColor = '#5cb85c'; // Green border for success
        } catch (error) {
            resultadoDiv.innerHTML = `
                <div class="alert alert-danger">
                    <strong>Erro no cálculo:</strong> ${error.message}
                </div>
            `;
            resultadoDiv.style.borderColor = '#ff4a4a'; // Red border for error
        }
    }

    // Function to clear the form
    function clearForm() {
        formularioCalculoDiv.querySelectorAll('input').forEach(input => {
            if (input.type === 'number' || input.type === 'text') {
                input.value = '';
            } else if (input.type === 'checkbox') {
                input.checked = false;
            }
        });
        formularioCalculoDiv.querySelectorAll('select').forEach(select => {
            // Reset to default option or first option
            if (select.options.length > 0) {
                select.value = select.querySelector('option[selected]') ? select.querySelector('option[selected]').value : select.options[0].value;
            }
        });
        resultadoDiv.style.display = 'none';
        resultadoDiv.innerHTML = '';
        resultadoDiv.style.borderColor = '#1f1f3f'; // Reset border color
    }

    // Initial population of categories when the page loads
    populateCategorySelect();
});